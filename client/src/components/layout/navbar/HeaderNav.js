import React from 'react';
import {Form, Icon, Image, Input, Menu, Header} from 'semantic-ui-react';
import './HeaderNav.scss';
//import logo from '../../assets/images/logo.jpg';
import {Link, withRouter} from 'react-router-dom';
import { PropTypes } from 'prop-types';
import {connect} from 'react-redux';
import { logout } from '../../../actions/auth';


  const HeaderNav = ({ logout }) => {

      return (
          // 1
          <Menu borderless className='top-menu' fixed='top'>
          {/* 2 */}
          <Menu.Item header className='logo'>
            <h3>Temp</h3>
          </Menu.Item>
          {/* 3 */}
          <Menu.Menu className='nav-container'>
            <Menu.Item className='search-input'>
                {/* 4 */}
                <Form.Field>
                  <Input placeholder='Search'
                         size='small'
                         action='Go'/>
                </Form.Field>
            </Menu.Item>
            {/* 5 */}
            <Menu.Menu position='right'>
              <Menu.Item>
                  <Link onClick={logout} to="#!">
                <span>logout</span>
                <Icon className='header-icon' name='logout' size='large'/>
                </Link>
              </Menu.Item>
              {/* */}
              <Menu.Item name='avatar'>
                <Image src='http://via.placeholder.com/80x80' avatar/>
              </Menu.Item>
            </Menu.Menu>
          </Menu.Menu>
        </Menu>
      );
  }
  
  HeaderNav.propTypes = {
    logout: PropTypes.func.isRequired,
  }
  
  const mapStateToProps = state =>({
    auth: state.auth
  })

  export default connect(mapStateToProps, { logout })(withRouter(HeaderNav));
