import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import StateProvider from './shared/StateProvider';

import actions from '../actions';

const { addClasp } = actions;
const placeholderImageURL = 'http://via.placeholder.com/350x350';

const handleOkClick = (state, user, setDashboardState) => {
  addClasp({
    imageUrl: state.imgUrl === '' || state.error ? placeholderImageURL : state.imgUrl,
    creator: user.name,
  });
  setDashboardState({
    addClaspsModalOpened: false,
  });
};

const AddClaspModal = ({ user, state, setState, setDashboardState }) => (
  <div className="bg-black-50 abs-center-stretch fixed flex items-center justify-center z-999">
    <div className="bg-white border-round width-50 padding">
      <h2>Create New Clasp</h2>
      <div className="preview-image margin-bottom-small" style={{ backgroundImage: `url(${state.imgUrl})` }}>
        {state.imgUrl !== '' && state.error ? <p>Couldn&apos;t find your image. Your image will be replaced with a placeholder.</p> : null}
      </div>
      <img
        className="display-none"
        onLoad={() => setState({
          ...state,
          error: false,
        })}
        onError={() => setState({
          ...state,
          error: true,
        })}
        src={state.imgUrl}
        alt=""
      />
      <label htmlFor="imgUrl">Image URL:</label>
      <input
        type="text"
        placeholder="https://YOUR_IMAGE_URL"
        defaultValue={state.imgUrl}
        onChange={
          e => setState({
            imgUrl: e.target.value,
          })
        }
      />
      <div className="flex margin-top">
        <button className="button--accent" onClick={() => handleOkClick(state, user, setDashboardState)}>OK</button>
        <button className="button--primary margin-left-small" onClick={() => setDashboardState({ addClaspsModalOpened: false })}>Cancel</button>
      </div>
    </div>
  </div>
);

AddClaspModal.propTypes = {
  state: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  setDashboardState: PropTypes.func.isRequired,
  setState: PropTypes.func.isRequired,
};

export default connect(store => ({
  user: store.user,
}))(StateProvider(AddClaspModal, {
  imgUrl: '',
}, {}));
