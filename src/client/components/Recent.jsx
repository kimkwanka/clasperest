/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import ClaspMasonry from './ClaspMasonry';

const Recent = ({ user, allClasps }) => (
  <div className="container margin-top-small">
    <Helmet title="Recent Clasps" />
    <h1>Recent Clasps</h1>
    <ClaspMasonry clasps={allClasps.collection} />
  </div>
);

Recent.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  allClasps: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(store => ({
  user: store.user,
  allClasps: store.allClasps,
}))(Recent);
