/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import AddClaspModal from './AddClaspModal';
import ClaspMasonry from './ClaspMasonry';
import StateProvider from './shared/StateProvider';
import Redirect from './shared/Redirect';

const Dashboard = ({ user, allClasps, state, setState }) => {
  const userClasps = allClasps.collection.filter(
    clasp => clasp.creator === user.name,
  );
  return (
    <div className="container margin-top-small">
      <Helmet title="Dashboard" />
      { state.addClaspsModalOpened ? <AddClaspModal setDashboardState={setState} /> : null }
      <div className="flex items-center justify-between">
        <h1>Your Clasps</h1>
        <button className="add-button h1 border-circle transition-fast" onClick={() => setState({ addClaspsModalOpened: true })}>+</button>
      </div>
      <ClaspMasonry clasps={userClasps} />
    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  allClasps: PropTypes.objectOf(PropTypes.shape).isRequired,
  state: PropTypes.objectOf(PropTypes.shape).isRequired,
  setState: PropTypes.func.isRequired,
};

export default connect(store => ({
  user: store.user,
  allClasps: store.allClasps,
}))(StateProvider(Redirect(Dashboard, false, '/'), {
  addClaspsModalOpened: false,
}, {}));
