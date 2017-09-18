import dotenv from 'dotenv';

const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

dotenv.load();

const consumerKey = process.env.TWITTER_API_KEY || '';
const consumerSecret = process.env.TWITTER_API_SECRET || '';
const callbackURL = (process.env.NODE_ENV !== 'production') ? 'http://localhost:8080/auth/twitter/callback' : process.env.TWITTER_CALLBACK_URL;

const twitterAuth = (app) => {
  app.use(session({
    store: new FileStore(),
    secret: '11THIS IS A SECRET STRING AND STUFF FOR HASHING THE SESSION11',
    resave: false,
    saveUninitialized: false,
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new TwitterStrategy({ consumerKey, consumerSecret, callbackURL },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => done(null, profile));
    },
  ));
  passport.serializeUser((user, done) => (done(null, user)));
  passport.deserializeUser((obj, done) => (done(null, obj)));

  app.get('/login', passport.authenticate('twitter', { scope: ['user:email'] }));
  app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }), (req, res) => {
    console.log('Logged In.');
    res.redirect('/dashboard');
  });
  app.get('/logout', (req, res) => {
    req.logout();
    console.log('Logged out.');
    res.redirect('/');
  });
};

export default twitterAuth;
