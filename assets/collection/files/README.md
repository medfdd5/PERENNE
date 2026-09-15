# MED Backend

Node/Express API backed by SQLite. Handles the product catalog, per-visitor
cart, and checkout/order records for the MED storefront. Data is persisted
in a local `med.db` file (created automatically on first run).

## Run it

```bash
cd backend
npm install
npm start
```

The API starts at `http://localhost:3000`. The frontend (`index.html`)
already points `API_BASE` at that address — open the HTML file in a browser
while the server is running and the storefront will load live product data
and a working cart/checkout.

## Endpoints

| Method | Path                              | Description                          |
|--------|------------------------------------|---------------------------------------|
| GET    | `/api/products`                   | List all products                     |
| GET    | `/api/products/:id`               | Get a single product                  |
| GET    | `/api/cart/:cartId`               | Get (or create) a cart                |
| POST   | `/api/cart/:cartId/items`         | Add an item `{ productId, quantity, size }` |
| PATCH  | `/api/cart/:cartId/items/:itemId` | Update quantity `{ quantity }` (0 removes it) |
| DELETE | `/api/cart/:cartId/items/:itemId` | Remove an item                        |
| POST   | `/api/checkout`                   | Checkout `{ cartId, email }` → creates an order, clears the cart |
| GET    | `/api/orders/:orderNumber`        | Look up an order                      |
| GET    | `/api/health`                     | Health check                          |

`cartId` is generated client-side (a random string kept in `localStorage`)
so each visitor gets a durable cart without needing accounts.

## Data

`products`, `carts`, `cart_items`, `orders`, and `order_items` tables in
SQLite (`db.js`). Products are seeded once on first run — delete `med.db`
to reset to the default catalog.
