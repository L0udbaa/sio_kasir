# SIO Kasir Backend

Simple Node.js/Express API for cashier system (`sio_kasir`).

## Requirements

- Node.js 14+
- MySQL database (schema should include `users`, `products`, `transactions`, etc.)

## Configuration

Create a `.env` file at the project root with the following values:

```dotenv
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=kasir_db
PORT=5000
JWT_SECRET=some_long_random_string
```

`JWT_SECRET` is used to sign authentication tokens. **Do not commit secrets**; it's already ignored in `.gitignore`.

## Running the server

```bash
npm install
npm run dev     # development with nodemon
# or
npm start       # normal start
```

API docs are available at `http://localhost:5000/api-docs` once the server is running.

## Clean code notes

- Controllers now validate input and return consistent response shapes.
- Authentication logic is centralized in `middleware/authMiddleware.js`.
- Sensitive configuration (JWT secret, database credentials) are read from environment variables.
- Routes are protected; only authenticated users may access data, and admin-only actions require an `isAdmin` check.

Feel free to extend models, add validation libraries, or configure ESLint for further code quality enforcement.
