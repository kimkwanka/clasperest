import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import reactRoutes from './reactRoutes';
import twitterAuth from './twitterAuth';
import dbRoutes from './dbRoutes';

const app = express();

// Serve static assets
app.use(express.static(path.join(__dirname, '../../dist/public')));

// Enable body-paser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable Github Authentication via passport
twitterAuth(app);

// Enable mongo db routes
dbRoutes(app);

// Server side rendering of React pages
app.use('*', reactRoutes);

// 404
app.get('*', (req, res) => {
  res.status(404).end();
});

export default app;
