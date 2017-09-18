function addClasp(clasp) {
  return {
    type: 'ADD_CLASP',
    clasp,
  };
}

function deleteClasp(clasp) {
  return {
    type: 'DELETE_CLASP',
    clasp,
  };
}
