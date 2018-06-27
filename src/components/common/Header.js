import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import LoadingDots from './LoadingDots';
import {Labels} from '../../constants';

const Header = ({loading}) => {  
  return (
    <nav>
      <NavLink exact to="/" activeClassName="active">{Labels.home.title}</NavLink>
      {" | "}      
      <NavLink to="/about" activeClassName="active">{Labels.about.title}</NavLink>
      {loading && <LoadingDots interval={100} dots={20}/>}
    </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Header;
