const path = require('path');
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

function startServer(port = PORT) {
  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      console.log(`MED backend running at http://localhost:${server.address().port}`);
      resolve(server);
    });
  });
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'med-fitness-website.html'));
});

// ---------- helpers ----------

function serializeProduct(row) {
  return {
    id: row.id,
    sku: row.sku,
    name: row.name,
    dose: row.dose,
    spec: row.spec,
    description: row.description,
    priceCents: row.price_cents,
    price: (row.price_cents / 100).toFixed(2),
    accent: row.accent,
    imageUrl: row.image_url,
    stock: row.stock
  };
}

function getOrCreateCart(cartId) {
  let cart = db.prepare('SELECT * FROM carts WHERE id = ?').get(cartId);
  if (!cart) {
    db.prepare('INSERT INTO carts (id) VALUES (?)').run(cartId);
    cart = db.prepare('SELECT * FROM carts WHERE id = ?').get(cartId);
  }
  return cart;
}

function serializeCart(cartId) {
  const items = db.prepare(`
    SELECT ci.id, ci.product_id, ci.quantity, ci.size,
           p.name, p.sku, p.price_cents, p.accent, p.dose
    FROM cart_items ci
    JOIN products p ON p.id = ci.product_id
    WHERE ci.cart_id = ?
    ORDER BY ci.id ASC
  `).all(cartId);

  const serialized = items.map(i => ({
    id: i.id,
    productId: i.product_id,
    name: i.name,
    sku: i.sku,
    size: i.size,
    quantity: i.quantity,
    unitPriceCents: i.price_cents,
    lineTotalCents: i.price_cents * i.quantity,
    accent: i.accent,
    dose: i.dose
  }));

  const subtotalCents = serialized.reduce((sum, i) => sum + i.lineTotalCents, 0);

  return {
    cartId,
    items: serialized,
    itemCount: serialized.reduce((sum, i) => sum + i.quantity, 0),
    subtotalCents,
    subtotal: (subtotalCents / 100).toFixed(2)
  };
}

// ---------- products ----------

app.get('/api/products', (req, res) => {
  const rows = db.prepare('SELECT * FROM products ORDER BY id ASC').all();
  res.json(rows.map(serializeProduct));
});

app.get('/api/featured', (req, res) => {
  const rows = db.prepare('SELECT * FROM products ORDER BY id ASC LIMIT 4').all();
  res.json(rows.map(serializeProduct));
});

app.get('/api/products/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Product not found' });
  res.json(serializeProduct(row));
});

// ---------- cart ----------

// Ensures a cart exists and returns its contents. Frontend generates and
// persists the cartId (e.g. in localStorage) and passes it on every call.
app.get('/api/cart/:cartId', (req, res) => {
  getOrCreateCart(req.params.cartId);
  res.json(serializeCart(req.params.cartId));
});

app.post('/api/cart/:cartId/items', (req, res) => {
  const { cartId } = req.params;
  const { productId, quantity = 1, size = 'M' } = req.body || {};

  if (!productId) return res.status(400).json({ error: 'productId is required' });

  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(productId);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  getOrCreateCart(cartId);

  const existing = db.prepare(
    'SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ? AND size = ?'
  ).get(cartId, productId, size);

  if (existing) {
    db.prepare('UPDATE cart_items SET quantity = quantity + ? WHERE id = ?')
      .run(quantity, existing.id);
  } else {
    db.prepare(
      'INSERT INTO cart_items (cart_id, product_id, quantity, size) VALUES (?, ?, ?, ?)'
    ).run(cartId, productId, quantity, size);
  }

  db.prepare('UPDATE carts SET updated_at = datetime(\'now\') WHERE id = ?').run(cartId);

  res.status(201).json(serializeCart(cartId));
});

app.patch('/api/cart/:cartId/items/:itemId', (req, res) => {
  const { cartId, itemId } = req.params;
  const { quantity } = req.body || {};

  if (!Number.isInteger(quantity)) {
    return res.status(400).json({ error: 'quantity must be an integer' });
  }

  const item = db.prepare('SELECT * FROM cart_items WHERE id = ? AND cart_id = ?').get(itemId, cartId);
  if (!item) return res.status(404).json({ error: 'Cart item not found' });

  if (quantity <= 0) {
    db.prepare('DELETE FROM cart_items WHERE id = ?').run(itemId);
  } else {
    db.prepare('UPDATE cart_items SET quantity = ? WHERE id = ?').run(quantity, itemId);
  }

  res.json(serializeCart(cartId));
});

app.delete('/api/cart/:cartId/items/:itemId', (req, res) => {
  const { cartId, itemId } = req.params;
  db.prepare('DELETE FROM cart_items WHERE id = ? AND cart_id = ?').run(itemId, cartId);
  res.json(serializeCart(cartId));
});

// ---------- checkout / orders ----------

app.post('/api/checkout', (req, res) => {
  const { cartId, email } = req.body || {};

  if (!cartId || !email) {
    return res.status(400).json({ error: 'cartId and email are required' });
  }

  const cart = serializeCart(cartId);
  if (cart.items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const orderNumber = 'MED-' + crypto.randomBytes(4).toString('hex').toUpperCase();

  const createOrder = db.transaction(() => {
    const info = db.prepare(`
      INSERT INTO orders (order_number, cart_id, email, total_cents, status)
      VALUES (?, ?, ?, ?, 'confirmed')
    `).run(orderNumber, cartId, email, cart.subtotalCents);

    const orderId = info.lastInsertRowid;

    const insertItem = db.prepare(`
      INSERT INTO order_items (order_id, product_id, name, size, quantity, unit_price_cents)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    for (const item of cart.items) {
      insertItem.run(orderId, item.productId, item.name, item.size, item.quantity, item.unitPriceCents);
    }

    db.prepare('DELETE FROM cart_items WHERE cart_id = ?').run(cartId);

    return orderId;
  });

  const orderId = createOrder();
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
  const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(orderId);

  res.status(201).json({
    id: order.id,
    orderNumber: order.order_number,
    email: order.email,
    status: order.status,
    totalCents: order.total_cents,
    total: (order.total_cents / 100).toFixed(2),
    createdAt: order.created_at,
    items: items.map(i => ({
      name: i.name,
      size: i.size,
      quantity: i.quantity,
      unitPriceCents: i.unit_price_cents
    }))
  });
});

app.get('/api/orders/:orderNumber', (req, res) => {
  const order = db.prepare('SELECT * FROM orders WHERE order_number = ?').get(req.params.orderNumber);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id);

  res.json({
    id: order.id,
    orderNumber: order.order_number,
    email: order.email,
    status: order.status,
    totalCents: order.total_cents,
    total: (order.total_cents / 100).toFixed(2),
    createdAt: order.created_at,
    items: items.map(i => ({
      name: i.name,
      size: i.size,
      quantity: i.quantity,
      unitPriceCents: i.unit_price_cents
    }))
  });
});

app.get('/api/health', (req, res) => {
  const productsCount = db.prepare('SELECT COUNT(*) AS count FROM products').get().count;
  res.json({ ok: true, service: 'med-backend', productsCount });
});

if (require.main === module) {
  startServer(PORT);
}

module.exports = { app, startServer };
