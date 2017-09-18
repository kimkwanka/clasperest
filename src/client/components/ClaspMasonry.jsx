/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';

import ClaspCard from './ClaspCard';

const ClaspMasonry = ({ clasps }) => {
  const claspCards = clasps.map(
    (clasp, index) => <ClaspCard clasp={clasp} key={clasp.id + index} />,
  );

  return (
    <div className="clasp-masonry">
      {claspCards}
    </div>
  );
};

ClaspMasonry.propTypes = {
  clasps: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ClaspMasonry;
