import axios from 'axios';

function saveActionRequest(action) {
  return {
    type: 'SAVE_ACTION_REQUEST',
    action,
  };
}

function saveActionFailure(action, error) {
  return {
    type: 'SAVE_ACTION_FAILURE',
    action,
    error,
  };
}

function syncCollection(collection) {
  return {
    type: 'SYNC_COLLECTION',
    collection,
  };
}

function saveActionAndSync(action) {
  return (dispatch, getState) => {
    dispatch(saveActionRequest(action));
    const { allClasps: { hash } } = getState();

    return axios.post('/db/update/', { action, hash })
    .then((res) => {
      if (res.data.collectionStatus === 'stale') {
        console.log('Out of date');
        dispatch(syncCollection(res.data.collection));
      }
      dispatch(action);
    })
    .catch((err) => {
      dispatch(saveActionFailure(action, err));
    });
  };
}

export function syncDataIfNeeded() {
  return (dispatch, getState) => {
    const { allClasps: { hash } } = getState();

    return axios.post('/db/sync/', { hash })
    .then((res) => {
      if (res.data.collectionStatus === 'stale') {
        console.log('Out of date');
        dispatch(syncCollection(res.data.collection));
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };
}


export function addClasp(clasp) {
  return saveActionAndSync({
    type: 'ADD_CLASP',
    clasp,
  });
}

export function deleteClasp(clasp) {
  return saveActionAndSync({
    type: 'DELETE_CLASP',
    clasp,
  });
}
