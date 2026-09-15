const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = process.env.PORT || 3000;

// --- DATABASE SETUP ---
// Use in-memory database for this example
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    // Create products table
    db.run(`CREATE TABLE products (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        sku TEXT NOT NULL,
        spec TEXT,
        priceCents INTEGER NOT NULL,
        description TEXT,
        dose TEXT,
        accent TEXT,
        imageUrl TEXT
    )`);

    // Insert local products data
    const stmt = db.prepare("INSERT INTO products VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    const localProducts = [
        { id: 1, name: 'Men\'s Compression Tee', sku: 'M-TEE-001', spec: '22mmHg', priceCents: 7500, description: 'Engineered for peak performance and rapid recovery.', dose: '22mmHg', accent: 'vital', imageUrl: 'assets/collection/men/men-tee.webp' },
        { id: 2, name: 'Men\'s Training Shorts', sku: 'M-SHORT-001', spec: '15mmHg', priceCents: 6000, description: 'Lightweight and flexible for unrestricted movement.', dose: '15mmHg', accent: 'electric', imageUrl: 'assets/collection/men/men-shorts.webp' },
        { id: 3, name: 'Men\'s Performance Hoodie', sku: 'M-HOOD-001', spec: 'Thermal', priceCents: 11000, description: 'Stay warm without overheating during your warmup.', dose: 'Thermal', accent: 'amber', imageUrl: 'assets/collection/men/men-hoodie.webp' },
        { id: 4, name: 'Men\'s Base Layer', sku: 'M-BASE-001', spec: '18mmHg', priceCents: 8500, description: 'A second-skin fit for core temperature regulation.', dose: '18mmHg', accent: 'vital', imageUrl: 'assets/collection/men/men-base-layer.webp' },
        { id: 5, name: 'Women\'s Racerback Tank', sku: 'W-TANK-001', spec: '12mmHg', priceCents: 6500, description: 'Maximum breathability with targeted support.', dose: '12mmHg', accent: 'vital', imageUrl: 'assets/collection/women/women-tank.webp' },
        { id: 6, name: 'Women\'s High-Waist Leggings', sku: 'W-LEG-001', spec: '20mmHg', priceCents: 9500, description: 'Sculpting compression that supports every move.', dose: '20mmHg', accent: 'electric', imageUrl: 'assets/collection/women/women-leggings.webp' },
        { id: 7, name: 'Women\'s Zip Jacket', sku: 'W-JACKET-001', spec: 'Weather-Resist', priceCents: 12500, description: 'A light, protective layer for outdoor sessions.', dose: 'Weather', accent: 'amber', imageUrl: 'assets/collection/women/women-jacket.webp' },
        { id: 8, name: 'Women\'s Sports Bra', sku: 'W-BRA-001', spec: 'High-Impact', priceCents: 5500, description: 'High-impact support with a comfortable, secure fit.', dose: 'Impact', accent: 'vital', imageUrl: 'assets/collection/women/women-bra.webp' }
    ];
    localProducts.forEach(p => {
        stmt.run(p.id, p.name, p.sku, p.spec, p.priceCents, p.description, p.dose, p.accent, p.imageUrl);
    });
    stmt.finalize();

    // Create carts and cart_items tables
    db.run(`CREATE TABLE carts (id TEXT PRIMARY KEY, createdAt INTEGER)`);
    db.run(`CREATE TABLE cart_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cartId TEXT,
        productId INTEGER,
        quantity INTEGER,
        size TEXT,
        FOREIGN KEY (cartId) REFERENCES carts(id),
        FOREIGN KEY (productId) REFERENCES products(id)
    )`);
});


// --- MIDDLEWARE ---
app.use(express.json());

// Vercel serves static files from the root. We need to tell Express where to find them.
const staticPath = path.join(process.cwd());
app.use(express.static(staticPath));


// --- API ROUTES ---

// Mock Cart API
app.get('/api/cart/:cartId', (req, res) => {
    res.json({ itemCount: 0, items: [], subtotalCents: 0 });
});

app.post('/api/cart/:cartId/items', (req, res) => {
    // In a real app, you would add items to the database here.
    res.status(201).json({ itemCount: 1, items: [/* mock item */], subtotalCents: req.body.priceCents || 7500 });
});

app.patch('/api/cart/:cartId/items/:itemId', (req, res) => {
    res.json({ itemCount: 1, items: [/* mock item */], subtotalCents: 7500 });
});

app.delete('/api/cart/:cartId/items/:itemId', (req, res) => {
    res.json({ itemCount: 0, items: [], subtotalCents: 0 });
});

// Mock Checkout API
app.post('/api/checkout', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    res.json({
        orderNumber: `MED-${Date.now()}`,
        email: email,
        totalCents: 13500 // mock total
    });
});


// --- SERVER ---
if (process.env.VERCEL) {
    // Running on Vercel, export the app
    module.exports = app;
} else {
    // Running locally
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
}