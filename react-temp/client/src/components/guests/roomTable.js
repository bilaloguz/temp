import React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import EnhancedTable from '../table/EnhancedTable';
import { setAlert } from '../../actions/alert';
import { addRoom, getRooms, deleteRoom, updateRoom } from '../../actions/room'
import { connect } from 'mongoose'

const RoomTable = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Room name',
        accessor: 'roomName',
      },
      {
        Header: 'Created by',
        accessor: 'createdBy',
      }
    ],
    []
  )

  const [data, setData] = React.useState(React.useMemo(() => getRooms, []))
  const [skipPageReset, setSkipPageReset] = React.useState(false)

  const updateMyData = (rowIndex, columnId, value) => {
    setSkipPageReset(true)
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return updateRoom(row)
      })
    )
  }

  return (
    <div>
      <CssBaseline />
      <EnhancedTable
        columns={columns}
        data={data}
        setData={setData}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </div>
  )
}

/**
RoomTable.propTypes = {
    getRooms :PropTypes.func.isRequired,
    addRoom: PropTypes.func.isRequired,
    updateRoom: PropTypes.func.isRequired,
    deleteRoom: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
 */
export default RoomTable
