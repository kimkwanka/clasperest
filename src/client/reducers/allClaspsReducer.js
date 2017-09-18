import hash from '../../shared/hash';

const allClasps = (state = {
  isFetching: false,
  hash: -1,
  collection: [
    {
      imageUrl: 'http://d1wl13ohcvociy.cloudfront.net/wp-content/uploads/2017/03/destra-fashion-300x450.jpg',
      id: 'clasp0',
      creator: 'Jill',
    }, {
      imageUrl: 'http://www.triennale.org/wp-content/uploads/2016/03/DESIGN-MUSEUM-EDIZIONI-05-1140x641.jpg',
      id: 'clasp1',
      creator: 'Owen',
    }, {
      imageUrl: 'https://alexabuata.files.wordpress.com/2011/02/fashion-blogs-by-kirstin-hanssen.jpg',
      id: 'clasp2',
      creator: 'Jill',
    }, {
      imageUrl: 'https://az616578.vo.msecnd.net/files/2016/06/13/636013904667895369144891105_Fashion+Illustrations+of+street+fashion+bloggers+by+houston+fashion+illustrator+Rongrong+DeVoe.jpg',
      id: 'clasp3',
      creator: 'Owen',
    }, {
      imageUrl: 'https://cdn.shopify.com/s/files/1/0293/9277/products/Fashion_Nova_07-31-17-520_800x.jpg?v=1501541594',
      id: 'clasp4',
      creator: 'Jill',
    }, {
      imageUrl: 'https://cdn.shopify.com/s/files/1/0293/9277/products/Fashion_Nova_08-16-17-645_800x.jpg?v=1502911141',
      id: 'clasp0',
      creator: 'Jill',
    }, {
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR13lzQTxj1QvBylx4ulDaXBTupNg0NqAAymDOyv17C3qN1Mmi1iw',
      id: 'clasp1',
      creator: 'Owen',
    }, {
      imageUrl: 'https://i.pinimg.com/736x/a3/26/f7/a326f7f2a0b30f4dee791abb811625c7--fashion-paint-fashion-design-ilustration.jpg',
      id: 'clasp2',
      creator: 'Jill',
    }, {
      imageUrl: 'https://i.pinimg.com/736x/4b/2f/00/4b2f00bf3b1045b86fdeb769c40cc8f9--photoshop-design-photoshop-tutorial.jpg',
      id: 'clasp3',
      creator: 'Owen',
    }, {
      imageUrl: 'https://hipsquare.files.wordpress.com/2011/04/bstyled.jpg',
      id: 'clasp4',
      creator: 'Jill',
    },
  ],
}, action) => {
  switch (action.type) {
    case 'SYNC_COLLECTION': {
      const newCollection = action.collection;
      const newHash = hash(newCollection);
      return {
        ...state,
        hash: newHash,
        collection: newCollection,
      };
    }
    case 'ADD_CLASP': {
      const newCollection = state.collection.concat({
        imageUrl: action.clasp.imageUrl,
        creator: action.clasp.creator,
        id: hash(action.clasp),
      });

      const newHash = hash(newCollection);

      return {
        ...state,
        hash: newHash,
        collection: newCollection,
      };
    }
    case 'DELETE_CLASP': {
      let index = -1;
      for (let i = 0; i < state.collection.length; i += 1) {
        if (state.collection[i].id === action.clasp.id) {
          index = i;
          break;
        }
      }
      if (index !== -1) {
        const newCollection = state.collection.slice(0);
        newCollection.splice(index, 1);
        const newHash = hash(newCollection);
        return {
          ...state,
          hash: newHash,
          collection: newCollection,
        };
      }
      return state;
    }
    default:
      return state;
  }
};

export default allClasps;
