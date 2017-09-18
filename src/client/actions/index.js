import { bindActionCreators } from 'redux';

import * as allClaspsActions from './allClaspsActions';

import store from '../../shared/store';

const allActions = {
  ...allClaspsActions,
};

//  'Prebind' the Redux store's dispatch() to all action creators for easier usage.
//  Components don't need connect() to be able to dispatch actions this way.
export default bindActionCreators(allActions, store.dispatch);
