/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import ClaspMasonry from './ClaspMasonry';

const Dashboard = ({ user, allClasps }) => {
  const userClasps = allClasps.collection.filter(
    clasp => clasp.creator === user.name,
  );
  return (
    <div className="container margin-top-small">
      <Helmet title="Dashboard" />
      <div className="flex items-center justify-between">
        <h1>Your Clasps</h1>
        <button className="add-button h1 border-circle transition-fast">+</button>
      </div>
      <ClaspMasonry clasps={userClasps} />
    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  allClasps: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(store => ({
  user: store.user,
  allClasps: store.allClasps,
}))(Dashboard);
