import { createStore } from 'redux';

import db from './db';
import reducer from '../client/reducers/allClaspsReducer';

const getServerStore = new Promise((resolve) => {
  db.find({}, (docs) => {
    let store;

    if (docs) {
      store = createStore(reducer, { ...docs[0].data });
    } else {
      store = createStore(reducer);
    }

    console.log('Created server store.');
    resolve(store);
  });
});

export default getServerStore;
