import React from 'react'
import TableComponent from './components/TableComponent'
import Profile from './components/Profile'
import {Routes, Route} from 'react-router-dom'
import ListMenu from './components/ListMenu'
import ConfigurationsTable from './components/ConfigurationsTable'
import EnvironmentsTable from './components/EnvironmentsTable'
import DatacentersTable from './components/DatacentersTable'

function App() {

  return (<div className='main'>
    <aside>
      <Profile name="AC Практика" />
      <ListMenu />
    </aside>
    <main>
      <Routes>
        <Route
          path='/preorders/*'
          element={<TableComponent />}
        />
        <Route
          path='/configurations'
          element={<ConfigurationsTable />}
        />
        <Route
          path='/environments'
          element={<EnvironmentsTable />}
        />
        <Route
          path='/dataCenters'
          element={<DatacentersTable />}
        />
      </Routes>
    </main>
  </div>
  )
}
export default App