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
                <SideBarItem path='/home'  label='Home' icon='home'/>
                    <SideBarItem path='/users' label='Accounts' icon='user' />
                    <SideBarItem path='/guests' label='Guests' icon='users' />
                    <SideBarItem highlight={true} label='Logs' icon='database' />
            </Menu>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <div class="temp-container">
            <div class="temp-holder">
            <h1 className="text-primary">Logs</h1>
            <div className="my-2">
                <button onClick={() => toggleForm(!displayForm)} type="button" className="btn btn-primary">
                    Add new Record
                </button>
            </div>
            {displayForm && <RoomForm />}
            <div className="table-wrap">
                <table className="table data-table table-responsive">
                    <thead>
                        <tr>
                            <th>roomname</th>
                            <th>Author</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRooms.map(room => {
                            return (
                                <tr key={room._id}>
                                    <th>{room.name}</th>
                                    <td>{room.createdBy}</td>
                                    <td><button onClick={e => deleteRoom(room._id)} type="button" className="btn btn-danger">
                                        <i className="far fa-trash-alt" />
                                    </button></td>
                                </tr>)
                        })}
                    </tbody>
                </table>
            </div>
            </div>
            </div>
            <Pagination
                roomsPerPage={roomsPerPage}
                totalPosts={rooms.length}
                paginate={paginate}
                currentPage={currentPage}
            />
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