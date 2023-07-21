import React, {useState, useEffect} from 'react'
import {Table, Input, Modal} from 'antd'
import {Environment} from '../models'
import {useDispatch, useSelector} from 'react-redux'
import {setEnvironmentSearchText} from '../store/searchText'
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import DirectoryModalWindow, {code, title, description} from './DirectoryModalWindow'
import {setStoredSelectedDirectory} from '../store/storedSelectedDirectory'
import {setModalActive} from '../store/memory'

export default function EnvironmentsTable() {
  const [dataSource, setData] = useState([])
  const [selectedEnvironment, setSelectedEnvironment] = useState(useSelector(state => state.storedSelectedDirectory))
  const storedSelectedDirectory = useSelector(state => state.storedSelectedDirectory)
  const modalActive = useSelector(state => state.memory.modalActive)
  const navigate = useNavigate()
  const goBack = () => navigate('/environments')
  const dispatch = useDispatch()
  const search = useSelector(state => state.searchText.environmentSearchText)

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Код',
      dataIndex: 'code',
      key: 'code',
      render: (text) => <p className='link'
        onMouseOver={() => {
          Environment.search({term: text})
            .then((results) => {
              dispatch(setStoredSelectedDirectory(results.results[0]))
            })
        }}
        onClick={() => {
          dispatch(setModalActive())
        }}
      > <Link to={storedSelectedDirectory.code}>{text}</Link></p >,
    },
    {
      title: 'Заголовок',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description'
    }
  ]

  useEffect(() => {
    Environment.search({term: search})
      .then(results => {
        setData(results.results)
      })
  }, [search])

  useEffect(() => {
    Environment.search({term: storedSelectedDirectory.code})
      .then((results) => {
        setSelectedEnvironment(results.results[0])
      })
  }, [storedSelectedDirectory.code])

  return (
    <div className='table'>
      <p className='tableTitle'>
        Среды
      </p>
      <div className="input" >
        <p>Поиск:</p>
        <Input
          placeholder="Начните ввод кода или заголовка"
          className="select"
          allowClear
          value={search}
          onChange={(text) => {
            dispatch(setEnvironmentSearchText(text.target.value))
            Environment.search({term: text.target.value})
              .then(results => {
                setData(results.results)
              })
          }}
        />
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
      />
      <Routes>
        <Route
          path={storedSelectedDirectory.code}
          element={
            <Modal
              open={modalActive}
              title='Редактирование среды'
              onOk={() => {
                dispatch(setModalActive())
                goBack()
                selectedEnvironment.code = code
                selectedEnvironment.title = title
                selectedEnvironment.description = description
                dispatch(setStoredSelectedDirectory(selectedEnvironment))
              }}
              onCancel={() => {
                dispatch(setModalActive())
                goBack()
              }} >
              <DirectoryModalWindow directory={selectedEnvironment} />
            </Modal>
          } />
      </Routes>
    </div>
  )
}