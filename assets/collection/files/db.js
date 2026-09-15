const path = require('path');

class Statement {
  constructor(db, query) {
    this.db = db;
    this.query = query.trim();
  }

  get(...args) {
    return this.db._execute(this.query, args, 'get');
  }

  all(...args) {
    return this.db._execute(this.query, args, 'all');
  }

  run(...args) {
    return this.db._execute(this.query, args, 'run');
  }
}

class MemoryStore {
  constructor() {
    this.products = [];
    this.carts = new Map();
    this.cartItems = [];
    this.orders = [];
    this.orderItems = [];
    this.nextProductId = 1;
    this.nextCartItemId = 1;
    this.nextOrderId = 1;
    this.nextOrderItemId = 1;
    this.seedProducts();
  }

  seedProducts() {
    if (this.products.length > 0) return;
    const products = [
      {
        id: this.nextProductId++,
        sku: 'MED-WT-01',
        name: 'Crossover Wrap Top — Pulse',
        dose: 'Warm-Up Flow',
        spec: 'Soft Stretch',
        description: 'Wrap-style studio top built for movement and airflow, with a sleek layer-ready silhouette.',
        price_cents: 6800,
        accent: 'vital',
        image_url: 'assets/product-wraptop.webp',
        stock: 84,
        created_at: new Date().toISOString()
      },
      {
        id: this.nextProductId++,
        sku: 'MED-LS-02',
        name: 'Compression Long Sleeve — Recover',
        dose: 'Cool Recovery',
        spec: 'Moisture-Wick',
        description: 'Black long sleeve layer designed to manage warmth and sweat during cooldowns and recovery days.',
        price_cents: 11800,
        accent: 'electric',
        image_url: 'assets/product-longsleeve.webp',
        stock: 46,
        created_at: new Date().toISOString()
      },
      {
        id: this.nextProductId++,
        sku: 'MED-BR-03',
        name: 'Support Bra — Signal',
        dose: 'Studio Set',
        spec: 'High-Impact Fit',
        description: 'Neon support bra offering strong coverage and breathable comfort for fast-paced cardio training.',
        price_cents: 9200,
        accent: 'amber',
        image_url: 'assets/product-bra.webp',
        stock: 61,
        created_at: new Date().toISOString()
      },
      {
        id: this.nextProductId++,
        sku: 'MED-LG-04',
        name: 'Training Legging — Core',
        dose: 'Load Session',
        spec: '4-Way Stretch',
        description: 'High-rise legging with sculpted support and soft stretch, ideal for lifting and long training sessions.',
        price_cents: 5400,
        accent: 'sage',
        image_url: 'assets/product-leggings.webp',
        stock: 73,
        created_at: new Date().toISOString()
      }
    ];
    this.products = products;
  }

  prepare(query) {
    return new Statement(this, query);
  }

  pragma() {}
  exec() {}
  transaction(fn) {
    return fn();
  }

  _execute(query, args, mode) {
    const normalized = query.replace(/\s+/g, ' ').trim();

    if (normalized === 'SELECT COUNT(*) AS count FROM products' || normalized === 'SELECT COUNT(*) AS n FROM products') {
      return mode === 'get' ? { count: this.products.length, n: this.products.length } : [];
    }

    if (normalized.startsWith('SELECT * FROM products')) {
      if (normalized.includes('WHERE id = ?')) {
        const productId = args[0];
        const product = this.products.find((item) => item.id === Number(productId));
        return mode === 'get' ? product : (product ? [product] : []);
      }
      let rows = [...this.products].sort((a, b) => a.id - b.id);
      if (normalized.includes('LIMIT 4')) rows = rows.slice(0, 4);
      return mode === 'get' ? rows[0] : rows;
    }

    if (normalized.startsWith('SELECT * FROM carts')) {
      const cartId = args[0];
      const cart = this.carts.get(cartId);
      return mode === 'get' ? cart : (cart ? [cart] : []);
    }

    if (normalized.includes('SELECT ci.id') && normalized.includes('FROM cart_items ci')) {
      const cartId = args[0];
      const rows = this.cartItems
        .filter((item) => item.cart_id === cartId)
        .map((item) => {
          const product = this.products.find((p) => p.id === item.product_id);
          return {
            id: item.id,
            product_id: item.product_id,
            quantity: item.quantity,
            size: item.size,
            name: product ? product.name : '',
            sku: product ? product.sku : '',
            price_cents: product ? product.price_cents : 0,
            accent: product ? product.accent : 'vital',
            dose: product ? product.dose : ''
          };
        })
        .sort((a, b) => a.id - b.id);
      return mode === 'get' ? rows[0] : rows;
    }

    if (normalized.startsWith('SELECT * FROM cart_items')) {
      if (normalized.includes('WHERE cart_id = ? AND product_id = ? AND size = ?')) {
        const [cartId, productId, size] = args;
        const item = this.cartItems.find((entry) => entry.cart_id === cartId && entry.product_id === Number(productId) && entry.size === size);
        return mode === 'get' ? item : (item ? [item] : []);
      }
      if (normalized.includes('WHERE id = ? AND cart_id = ?')) {
        const [itemId, cartId] = args;
        const item = this.cartItems.find((entry) => entry.id === Number(itemId) && entry.cart_id === cartId);
        return mode === 'get' ? item : (item ? [item] : []);
      }
      if (normalized.includes('WHERE id = ?')) {
        const itemId = args[0];
        const item = this.cartItems.find((entry) => entry.id === Number(itemId));
        return mode === 'get' ? item : (item ? [item] : []);
      }
      return mode === 'get' ? undefined : [];
    }

    if (normalized.startsWith('INSERT INTO carts')) {
      const cartId = args[0];
      this.carts.set(cartId, {
        id: cartId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      return { lastInsertRowid: cartId };
    }

    if (normalized.startsWith('INSERT INTO cart_items')) {
      const [cartId, productId, quantity, size] = args;
      const item = {
        id: this.nextCartItemId++,
        cart_id: cartId,
        product_id: Number(productId),
        quantity: Number(quantity),
        size
      };
      this.cartItems.push(item);
      return { lastInsertRowid: item.id };
    }

    if (normalized.startsWith('UPDATE carts')) {
      const cartId = args[args.length - 1];
      const cart = this.carts.get(cartId);
      if (cart) {
        cart.updated_at = new Date().toISOString();
      }
      return { changes: 1 };
    }

    if (normalized.startsWith('UPDATE cart_items SET quantity = quantity + ?')) {
      const [delta, itemId] = args;
      const item = this.cartItems.find((entry) => entry.id === Number(itemId));
      if (item) {
        item.quantity += Number(delta);
      }
      return { changes: item ? 1 : 0 };
    }

    if (normalized.startsWith('UPDATE cart_items SET quantity = ?')) {
      const [quantity, itemId] = args;
      const item = this.cartItems.find((entry) => entry.id === Number(itemId));
      if (item) {
        item.quantity = Number(quantity);
      }
      return { changes: item ? 1 : 0 };
    }

    if (normalized.startsWith('DELETE FROM cart_items')) {
      if (normalized.includes('WHERE id = ? AND cart_id = ?')) {
        const [itemId, cartId] = args;
        this.cartItems = this.cartItems.filter((entry) => !(entry.id === Number(itemId) && entry.cart_id === cartId));
        return { changes: 1 };
      }
      if (normalized.includes('WHERE cart_id = ?')) {
        const cartId = args[0];
        this.cartItems = this.cartItems.filter((entry) => entry.cart_id !== cartId);
        return { changes: 1 };
      }
      if (normalized.includes('WHERE id = ?')) {
        const itemId = args[0];
        this.cartItems = this.cartItems.filter((entry) => entry.id !== Number(itemId));
        return { changes: 1 };
      }
      return { changes: 0 };
    }

    if (normalized.startsWith('INSERT INTO orders')) {
      const [orderNumber, cartId, email, totalCents] = args;
      const order = {
        id: this.nextOrderId++,
        order_number: orderNumber,
        cart_id: cartId,
        email,
        total_cents: Number(totalCents),
        status: 'confirmed',
        created_at: new Date().toISOString()
      };
      this.orders.push(order);
      return { lastInsertRowid: order.id };
    }

    if (normalized.startsWith('INSERT INTO order_items')) {
      const [orderId, productId, name, size, quantity, unitPriceCents] = args;
      const item = {
        id: this.nextOrderItemId++,
        order_id: Number(orderId),
        product_id: Number(productId),
        name,
        size,
        quantity: Number(quantity),
        unit_price_cents: Number(unitPriceCents)
      };
      this.orderItems.push(item);
      return { lastInsertRowid: item.id };
    }

    if (normalized.startsWith('SELECT * FROM orders')) {
      if (normalized.includes('WHERE id = ?')) {
        const orderId = args[0];
        const order = this.orders.find((item) => item.id === Number(orderId));
        return mode === 'get' ? order : (order ? [order] : []);
      }
      if (normalized.includes('WHERE order_number = ?')) {
        const orderNumber = args[0];
        const order = this.orders.find((item) => item.order_number === orderNumber);
        return mode === 'get' ? order : (order ? [order] : []);
      }
      return mode === 'get' ? undefined : [];
    }

    if (normalized.startsWith('SELECT * FROM order_items')) {
      const orderId = args[0];
      const rows = this.orderItems.filter((item) => item.order_id === Number(orderId));
      return mode === 'get' ? rows[0] : rows;
    }

    return mode === 'get' ? undefined : [];
  }
}

const db = new MemoryStore();
module.exports = db;
