import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from '../actions';

const { deleteClasp } = actions;

const ClaspCard = ({ clasp, user}) => {
  return (
    <div className="clasp relative border-round bg-grey margin-bottom-small margin-right-small">
      <img className="clasp__image border-round" src={clasp.imageUrl} alt="" />
      <div className="abs-center-stretch border-round transition-fast opacity-0 opacity-hover-100 bg-hover-black-50 flex-column justify-between">
        <div className="right">
          <button className="delete-button border-circle transition-fast margin-top-tiny margin-right-tiny">X</button>
        </div>
        <p className="c-white no-margin bg-black width-100 center border-round-bottom">
          by <span className="c-accent">{clasp.creator}</span>
        </p>
      </div>
    </div>
  );
};

ClaspCard.propTypes = {
  clasp: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(store => ({
  user: store.user,
}))(ClaspCard);
