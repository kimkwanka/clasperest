/* eslint-disable no-bitwise */
/* eslint-disable no-underscore-dangle */

// Simple hash implementation taken from http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/

const hash = (obj) => {
  let _hash = 0;
  let charCode;

  const objAsStr = JSON.stringify(obj);
  const len = objAsStr.length;

  if (len === 0) {
    return _hash;
  }

  for (let i = 0; i < len; i += 1) {
    charCode = objAsStr.charCodeAt(i);
    _hash = ((_hash << 5) - _hash) + charCode;
    _hash &= _hash;
  }
  return _hash;
};

export default hash;
