import React, { Fragment, useState, Children } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { addUser } from '../../actions/user';
import PropTypes from 'prop-types';
import HeaderNav from '../layout/navbar/HeaderNav';
import { SideBar } from '../layout/navbar/Navbar';
import { SideBarItem } from '../layout/navbar/SideBarItem';
import { Menu } from 'semantic-ui-react';
import '../layout/navbar/sideBar.scss';

const AddUser = ({ setAlert, addUser, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        password: ''
    });
    const { name, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        if (!name || !password) {
            setAlert('Incorrect registrition credentials', 'danger', 2000)
        } else {
            addUser({ name, password })
        }
    }

    return <Fragment>

        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={e => onChange(e)}
                    required />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    value={password}
                    onChange={e => onChange(e)}
                    required
                />
            </div>
            <input type="submit" className="btn btn-primary" value="Add user" />
        </form>

    </Fragment>
}

AddUser.propTypes = {
    setAlert: PropTypes.func.isRequired,
    addUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, addUser })(AddUser)
