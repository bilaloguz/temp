import React, { Fragment, useEffect, useState, Link } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getRooms, deleteRoom } from '../../actions/room'
import auth, { logout } from '../../actions/auth';
import HeaderNav from '../layout/navbar/HeaderNav';
import  SideBarItem  from '../layout/navbar/SideBarItem';
import { Menu } from 'semantic-ui-react';
import '../layout/navbar/sideBar.scss';
import '../../styles/shared.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import RoomTable from './tester/App';
import { Redirect } from 'react-router-dom'


const Home = ({
    getRooms,
    deleteRoom,
    auth:{
        user,
        isAuthenticated,
    },
    room: {
        rooms,
        loading, logout } }) => {

    useEffect(() => {
        getRooms()
    }, [getRooms])


    if (!isAuthenticated) {
        return <Redirect to="login"/>
    }
    return loading ? <Spinner /> : (

        <Fragment>
            <HeaderNav />
            <Menu borderless vertical stackable fixed='left' className='side-nav'>
                <SideBarItem highlight={true} label='Home' icon='home'/>
                    <SideBarItem path='/users' label='Accounts' icon='user' />
                    <SideBarItem path='/guests' label='Guests' icon='users' />
                    <SideBarItem path='/logs' label='Logs' icon='database' />
                    <SideBarItem path='/logout' label='logout' icon='logout' />
            </Menu>

            <br></br><br></br><br></br><br></br>

            <div className="temp-holder">
                <h3>&nbsp; Rooms</h3>
                <CssBaseline />
                <div className="card">
                <RoomTable/>
                </div>
            </div>

        </Fragment>

    )
}

Home.propTypes = {
    logout: PropTypes.func.isRequired,
    getRooms: PropTypes.func.isRequired,
    room: PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    room: state.room,
    auth: state.auth
})

export default connect(mapStateToProps, { getRooms, deleteRoom, logout })(Home);