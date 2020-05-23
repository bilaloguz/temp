import React, { Fragment ,useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth'

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name:'',
        password:''
    });

    const { name, password} = formData;
    
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    
    const onSubmit = async e => {
        e.preventDefault();
        login(name, password)
      }

      //redirect if logged in
      if(isAuthenticated){
        return <Redirect to="/home" />
      } 

    return <Fragment>
      <div style={{ background: "#282c34" }}>
        <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Username" 
            name="name"
            value={name}
            onChange={e=> onChange(e)} 
            required />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e=> onChange(e)} 
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      </div>
    </Fragment>
}
login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, {login})(Login)
