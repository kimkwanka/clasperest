import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';

const Header = ({ user }) => (
  <header>
    <div className="container flex">
      <Link className="logo-text" to="/">clasperest</Link>
      <nav>
        {user.authenticated ?
          <ul>
            <li><NavLink to="/dashboard" activeClassName="navItemActive">Dashboard</NavLink></li>
            <li><NavLink to="/recent" activeClassName="navItemActive">Recent Clasps</NavLink></li>
            <li><a className="button button--primary-clear" href="/logout">Sign Out</a></li>
          </ul> :
          <ul>
            <li><NavLink to="/recent" activeClassName="navItemActive">Recent Clasps</NavLink></li>
            <li><a className="button button--primary-clear" href="/login">Sign In</a></li>
          </ul>}
      </nav>
    </div>
  </header>
);

Header.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
};

// 'connect' breaks NavLink 'activeClassName' updating correctly, so
// we need to use withRouter to explicitly pass location context to Header
export default withRouter(connect(store => ({
  user: store.user,
}))(Header));

