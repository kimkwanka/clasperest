const mongoURI = (process.env.NODE_ENV !== 'production') ? 'mongodb://localhost:27017/book-trader' : process.env.MONGODB_URI || 'mongodb://localhost:27017/book-trader';
const mongo = require('mongodb').MongoClient;

let db = null;

const close = () => {
  if (db) {
    db.close();
  }
};

const connect = (cb) => {
  mongo.connect(mongoURI, (err, _db) => {
    if (err) console.log('DB Connection Error', err); // eslint-disable-line no-console
    db = _db;
    cb(db);
  });
};

// Used by the other functions to get a connection to MongoDB.
// Connects, if no connection is established yet.
const get = (cb) => {
  if (db) {
    cb(db);
  } else {
    connect(cb);
  }
};

const find = (query, cb) => {
  get((_db) => {
    _db.collection('clasps').find(query)
      .toArray((err, docs) => {
        if (err) console.log('DB Find Error', err); // eslint-disable-line no-console
        if (docs && docs.length > 0) {
          return cb(docs);
        }
        return cb(null);
      });
  });
};

const update = (obj, cb) => {
  get((_db) => {
    _db.collection('clasps').update({ _id: obj.id }, { data: obj }, { upsert: true }, (err) => {
      if (err) console.log('DB Update Error', err); // eslint-disable-line no-console
      if (cb) cb(obj);
    });
  });
};


module.exports = {
  find,
  close,
  update,
};
