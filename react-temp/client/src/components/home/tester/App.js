import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import EnhancedTable from './components/EnhancedTable'
import makeData from './makeData'
import { getUsers } from '../../../actions/user'

const App = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Room',
        accessor: 'firstName',
      },
      {
        Header: 'Created by',
        accessor: 'lastName',
      },
    ],
    []
  )

  const [data, setData] = React.useState(React.useMemo(() => getUsers(), []))
  const [skipPageReset, setSkipPageReset] = React.useState(false)

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
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

export default App
