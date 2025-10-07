import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import authRouter from './routes/auth.js';
import oauthRouter from './routes/oauth.js';

dotenv.config();

const app = express();

// trust proxy so we can build correct callback URLs behind Render's proxy
app.set('trust proxy', 1);

const allowedOrigin = process.env.FRONTEND_ORIGIN || '*';
const corsOptions = {
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'codexintern-backend' });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRouter);
app.use('/api/oauth', oauthRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found', path: req.path });
});

// Error handler
app.use((err, _req, res, _next) => {
  const status = typeof err?.status === 'number' ? err.status : 500;
  const message = err?.message || 'Server error';
  res.status(status).json({ message });
});

const port = process.env.PORT || 8080;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('Missing MONGODB_URI environment variable');
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
