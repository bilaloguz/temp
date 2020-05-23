import React, { Fragment, useEffect, useState, Link } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getRooms, deleteRoom } from '../../actions/room'
import RoomForm from '../rooms/RoomForm'
import Pagination from '../pagination/Pagination'
import { logout } from '../../actions/auth';
import { Header } from 'semantic-ui-react';
import HeaderNav from '../layout/navbar/HeaderNav';
import  SideBarItem  from '../layout/navbar/SideBarItem';
import { Menu } from 'semantic-ui-react';
import '../layout/navbar/sideBar.scss';
import '../../styles/shared.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import RoomTable from './tester/App';


const Home = ({
    getRooms,
    deleteRoom,
    auth,
    room: {
        rooms,
        loading } }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(10);

    useEffect(() => {
        getRooms()
    }, [getRooms, currentPage, roomsPerPage])

    const [displayForm, toggleForm] = useState(false)

    //Get current users
    const indexOfLastPost = currentPage * roomsPerPage;
    const indexOfFirstPost = indexOfLastPost - roomsPerPage;
    const currentRooms = rooms.slice(indexOfFirstPost, indexOfLastPost)

    //change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)



    return loading ? <Spinner /> : (

        <Fragment>
            <HeaderNav />
            <Menu borderless vertical stackable fixed='left' className='side-nav'>
                <SideBarItem highlight={true} label='Home' icon='home'/>
                    <SideBarItem path='/users' label='Accounts' icon='user' />
                    <SideBarItem path='/guests' label='Guests' icon='users' />
                    <SideBarItem path='/logs' label='Logs' icon='database' />
                    <SideBarItem path='/home' label='logout' icon='logout' />
            </Menu>

            <br></br><br></br><br></br><br></br>
            <div className="temp-container">
            <div className="temp-holder">
                <h3>&nbsp; Rooms</h3>
                <CssBaseline />
                <RoomTable/>
            </div>
            </div>
        </Fragment>

    )
}

Home.propTypes = {
    getRooms: PropTypes.func.isRequired,
    room: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    room: state.room,
    auth: state.auth
})

export default connect(mapStateToProps, { getRooms, deleteRoom })(Home)