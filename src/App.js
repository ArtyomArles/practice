import React, {useEffect} from 'react'
import TableComponent from './components/TableComponent'
import JustTable from './components/JustTable'
import Profile from './components/Profile'
import SelectElement from './components/SelectElement'
import {Routes, Route, Link} from 'react-router-dom'
import {Button} from 'antd'
import {AiFillHeart} from 'react-icons/ai'
import {BsFillBookmarkFill} from 'react-icons/bs'
import {MdPhotoCamera, MdMap} from 'react-icons/md'
import {Columns, Configurations, Datacenters, Environments} from './data'

function App() {
  useEffect(() => {
    const selectBlock = document.getElementById('selectBlock')
    selectBlock.style.display = 'none'
  }, [])

  return (<div className='main'>
    <aside>
      <Profile name="AC Практика" />
      <Button className='menuButton' onClick={() => {
        const selectBlock = document.getElementById('selectBlock')
        if (selectBlock.style.display === 'none') {
          selectBlock.style.display = ''
        } else {
          selectBlock.style.display = 'none'
        }
      }}>Меню</Button>


      <div className="selectBlock" id="selectBlock">
        <Link to="/preorders"><SelectElement id={1} img={<AiFillHeart />} title="Потребности" /></Link>
        <Link to="/configurations"><SelectElement id={2} img={<BsFillBookmarkFill />} title="Конфигурации" /></Link>
        <Link to="/environments"><SelectElement id={3} img={<MdPhotoCamera />} title="Среды" /></Link>
        <Link to="/dataCenters"><SelectElement id={4} img={<MdMap />} title="ЦОДы" /></Link>
      </div>

    </aside>
    <main>
      <Routes>
        <Route
          path='/preorders'
          element={<TableComponent />}
        />
        <Route
          path='/configurations'
          element={<JustTable
            title='Конфигурации'
            columns={Columns}
            dataSource={Configurations} />}
        />
        <Route
          path='/environments'
          element={<JustTable
            title='Среды'
            columns={Columns}
            dataSource={Datacenters} />}
        />
        <Route
          path='/dataCenters'
          element={<JustTable
            title='ЦОДы'
            columns={Columns}
            dataSource={Environments} />}
        />
      </Routes>
    </main>
  </div>
  )
}
export default App