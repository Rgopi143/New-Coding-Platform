import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body || {};

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'email, password, and name are required' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash, name });

    return res.status(201).json({ id: user.id, email: user.email, name: user.name });
  } catch (err) {
    // Handle Mongo duplicate key error
    if (err && typeof err === 'object' && (err.code === 11000 || err.code === '11000')) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    // Basic validation message passthrough
    const message = (err && err.message) ? String(err.message) : 'Server error';
    return res.status(500).json({ message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: String(err) });
  }
});

router.get('/me', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('email name');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({ id: user.id, email: user.email, name: user.name });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: String(err) });
  }
});

export default router;
