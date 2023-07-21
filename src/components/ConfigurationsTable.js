import React, {useState, useEffect} from 'react'
import {Table, Input, Modal} from 'antd'
import {Configuration} from '../models'
import {useDispatch, useSelector} from 'react-redux'
import {setConfigurationSearchText} from '../store/searchText'
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import DirectoryModalWindow, {code, title, description} from './DirectoryModalWindow'
import {setStoredSelectedDirectory} from '../store/storedSelectedDirectory'
import {setModalActive} from '../store/memory'

export default function ConfigurationsTable() {
  const [dataSource, setData] = useState([])
  const [selectedConfiguration, setSelectedConfiguration] = useState(useSelector(state => state.storedSelectedDirectory))
  const storedSelectedDirectory = useSelector(state => state.storedSelectedDirectory)
  const modalActive = useSelector(state => state.memory.modalActive)
  const navigate = useNavigate()
  const goBack = () => navigate('/configurations')
  const dispatch = useDispatch()
  const search = useSelector(state => state.searchText.configurationSearchText)

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
          Configuration.search({term: text})
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
    Configuration.search({term: search})
      .then(results => {
        setData(results.results)
      })
  }, [search])

  useEffect(() => {
    Configuration.search({term: storedSelectedDirectory.code})
      .then((results) => {
        setSelectedConfiguration(results.results[0])
      })
  }, [storedSelectedDirectory.code])

  return (
    <div className='table'>
      <p className='tableTitle'>
        Конфигурации
      </p>
      <div className="input" >
        <p>Поиск:</p>
        <Input
          placeholder="Начните ввод кода или заголовка"
          className="select"
          allowClear
          value={search}
          onChange={(text) => {
            dispatch(setConfigurationSearchText(text.target.value))
            Configuration.search({term: text.target.value})
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
              title='Редактирование конфигурации'
              onOk={() => {
                dispatch(setModalActive())
                goBack()
                selectedConfiguration.code = code
                selectedConfiguration.title = title
                selectedConfiguration.description = description
                dispatch(setStoredSelectedDirectory(selectedConfiguration))
              }}
              onCancel={() => {
                dispatch(setModalActive())
                goBack()
              }} >
              <DirectoryModalWindow directory={selectedConfiguration} />
            </Modal>
          } />
      </Routes>
    </div>
  )
}