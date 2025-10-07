import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from '../models/User.js';

const router = Router();

const FRONTEND_URL = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

function getBaseUrlFromRequest(req) {
  if (process.env.BACKEND_BASE_URL) return process.env.BACKEND_BASE_URL;
  const proto = (req.headers['x-forwarded-proto'] || req.protocol || 'http').toString();
  const host = (req.headers['x-forwarded-host'] || req.headers.host || '').toString();
  return `${proto}://${host}`;
}

function issueTokenAndRedirect(res, user) {
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  const redirectUrl = new URL('/oauth/callback', FRONTEND_URL);
  redirectUrl.searchParams.set('token', token);
  res.redirect(redirectUrl.toString());
}

// Providers availability endpoint
router.get('/providers', (_req, res) => {
  res.json({
    google: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    github: Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
    facebook: Boolean(process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET)
  });
});

// Google Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/oauth/google/callback'
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const googleId = profile.id;
          const email = profile.emails?.[0]?.value;
          const name = profile.displayName || profile.name?.givenName || 'User';

          let user = await User.findOne({ $or: [{ googleId }, { email }] });
          if (!user) {
            user = await User.create({ googleId, email, name });
          } else if (!user.googleId) {
            user.googleId = googleId;
            if (!user.name && name) user.name = name;
            await user.save();
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  router.get('/google', (req, res, next) => {
    // set callback dynamically so reverse proxies are handled
    const base = getBaseUrlFromRequest(req);
    (passport._strategies.google)._callbackURL = `${base}/api/oauth/google/callback`;
    next();
  }, passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' }));

  router.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: `${FRONTEND_URL}/login?error=google` }),
    (req, res) => issueTokenAndRedirect(res, req.user)
  );
}

// GitHub Strategy
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/api/oauth/github/callback'
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const githubId = profile.id;
          const email = profile.emails?.[0]?.value;
          const name = profile.displayName || profile.username || 'User';

          let user = await User.findOne({ $or: [{ githubId }, { email }] });
          if (!user) {
            user = await User.create({ githubId, email, name });
          } else if (!user.githubId) {
            user.githubId = githubId;
            if (!user.name && name) user.name = name;
            await user.save();
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  router.get('/github', (req, res, next) => {
    const base = getBaseUrlFromRequest(req);
    (passport._strategies.github)._callbackURL = `${base}/api/oauth/github/callback`;
    next();
  }, passport.authenticate('github', { scope: ['user:email'] }));

  router.get(
    '/github/callback',
    passport.authenticate('github', { session: false, failureRedirect: `${FRONTEND_URL}/login?error=github` }),
    (req, res) => issueTokenAndRedirect(res, req.user)
  );
}

// Facebook Strategy
if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: '/api/oauth/facebook/callback',
        profileFields: ['id', 'emails', 'displayName']
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const facebookId = profile.id;
          const email = profile.emails?.[0]?.value;
          const name = profile.displayName || 'User';

          let user = await User.findOne({ $or: [{ facebookId }, { email }] });
          if (!user) {
            user = await User.create({ facebookId, email, name });
          } else if (!user.facebookId) {
            user.facebookId = facebookId;
            if (!user.name && name) user.name = name;
            await user.save();
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  router.get('/facebook', (req, res, next) => {
    const base = getBaseUrlFromRequest(req);
    (passport._strategies.facebook)._callbackURL = `${base}/api/oauth/facebook/callback`;
    next();
  }, passport.authenticate('facebook', { scope: ['email'] }));

  router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { session: false, failureRedirect: `${FRONTEND_URL}/login?error=facebook` }),
    (req, res) => issueTokenAndRedirect(res, req.user)
  );
}

export default router;

