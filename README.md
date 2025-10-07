# Deployment & Auth Backend

## Environment variables (Backend)
Create `server/.env` with:

```
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority&appName=<app>
JWT_SECRET=<a-strong-secret>
PORT=8080
```

- MONGODB_URI: Use your MongoDB Atlas URI, or local `mongodb://127.0.0.1:27017/codexintern`.
- JWT_SECRET: Any long random string.

## MongoDB Compass
- Open Compass and paste the same `MONGODB_URI` to connect.
- Create a database (e.g. `codexintern`) and it will be used automatically by Mongoose on write.

## Render configuration
`render.yaml` provisions:
- Static frontend (Vite) with SPA rewrites
- Node backend at `server/` with env vars `MONGODB_URI`, `JWT_SECRET`

## API endpoints
- POST `/api/auth/register` { email, password, name }
- POST `/api/auth/login` { email, password }
- GET `/api/auth/me` with `Authorization: Bearer <token>`

## Frontend env (Vite)
Create `.env` at repo root:

```
VITE_API_URL=http://localhost:8080
```

For Render, set `VITE_API_URL` to your backend URL (e.g. `https://codexintern-backend.onrender.com`).
