import React, { Fragment ,useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import './login.scss';

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
      <div > 

        <div className="ui middle aligned center aligned grid" style={{ height: '100vh' }}>

          <div className="column" style={{ maxWidth: 450 }}>
            <h2 className="ui blue image header">
              <i className="fa fa-sign-in"/>
              <div className="content">
                Temp Login
      </div>
            </h2>
            <form className="ui large form" onSubmit={e => onSubmit(e)}>
              <div className="ui stacked segment">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon"></i>
                    <input type="text" name="name" placeholder="Username" value={name}
                      onChange={e => onChange(e)} />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input type="password" name="password" placeholder="Password" value={password}
                      onChange={e => onChange(e)}
                      required />
                  </div>
                </div>
                <input type="submit" className="ui fluid large blue submit button" value="Login"/>
              </div>

              <div className="ui error message"></div>

            </form>


          </div>
        </div>
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
