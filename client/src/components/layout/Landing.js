import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';


const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/home"/>
  }

    return (
      <Redirect to="/login"/>
    ) 
}

Landing.propTypes = {
  isAuthenticated:PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing)