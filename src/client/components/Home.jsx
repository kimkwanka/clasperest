import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Home = ({ user }) => (
  <div>
    <Helmet title="Home" />
    <div className="width-100 height-100-vh" style={{ background: 'url("/fistbump.jpg")', backgroundSize: 'cover' }}>
      <div className="flex-column items-center justify-center bg-black-50 width-100 height-100">
        <h1 className="c-text-inverse bold uppercase h0 wide">Dare to clasp.</h1>
        <p className="c-text-inverse bold margin width-75 h4">
          Clasping. Everyone talks about it but only the truly professional are able to clasp day in and day out.
          Here at clasperest we understand your commitment and want to give you what you need to take your clasping to the next level.
        </p>
        {user.authenticated ?
          <Link className="button button--accent margin" to="/dashboard">Start Clasping</Link> :
          <a className="button button--accent margin" href="/login">Sign in with Github</a>}
      </div>
    </div>
  </div>
);

Home.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(store => ({
  user: store.user,
}))(Home);
