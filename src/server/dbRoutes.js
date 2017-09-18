import db from './db';
import getServerStore from './serverStore';

const authenticatedOnly = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  return res.status(401).send('Authentication required');
};

const dbRoutes = (app) => {
  app.post('/db/update', authenticatedOnly, (req, res) => {
    const { action, hash } = req.body;
    getServerStore.then((serverStore) => {
      const serverHash = serverStore.getState().hash;
      const collectionBeforeAction = serverStore.getState().collection;

      serverStore.dispatch(action);

      const dataToSave = {
        collection: serverStore.getState().collection,
        hash: serverStore.getState().hash,
      };

      db.update(dataToSave, (doc) => {
        if (process.env.NODE_ENV !== 'production') {
          console.log('Saved:', doc);
        }
        // If client hash differs from server hash, send over the whole server collection data
        if (serverHash !== hash) {
          res.send({ collectionStatus: 'stale', collection: collectionBeforeAction });
        } else {
          res.send({ collectionStatus: 'ok', collection: null });
        }
      });
    });
  });
  app.post('/db/sync', authenticatedOnly, (req, res) => {
    const { hash } = req.body;
    getServerStore.then((serverStore) => {
      const serverHash = serverStore.getState().hash;
      const collectionBeforeAction = serverStore.getState().collection;

      // If client hash differs from server hash, send over the whole server collection data
      if (serverHash !== hash) {
        res.send({ collectionStatus: 'stale', collection: collectionBeforeAction });
      } else {
        res.send({ collectionStatus: 'ok', collection: null });
      }
    });
  });
};

export default dbRoutes;
