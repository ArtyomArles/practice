import React, {useState, useEffect} from 'react'
import {Table, Input, Modal} from 'antd'
import {Datacenter} from '../models'
import {useDispatch, useSelector} from 'react-redux'
import {setDatacenterSearchText} from '../store/searchText'
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import DirectoryModalWindow, {code, title, description} from './DirectoryModalWindow'
import {setStoredSelectedDirectory} from '../store/storedSelectedDirectory'
import {setModalActive} from '../store/memory'

export default function DatacentersTable() {
  const [dataSource, setData] = useState([])
  const [selectedDatacenter, setSelectedDatacenter] = useState(useSelector(state => state.storedSelectedDirectory))
  const storedSelectedDirectory = useSelector(state => state.storedSelectedDirectory)
  const modalActive = useSelector(state => state.memory.modalActive)
  const navigate = useNavigate()
  const goBack = () => navigate('/datacenters')
  const dispatch = useDispatch()
  const search = useSelector(state => state.searchText.datacenterSearchText)

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
          Datacenter.search({term: text})
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
    Datacenter.search({term: search})
      .then(results => {
        setData(results.results)
      })
  }, [search])

  useEffect(() => {
    Datacenter.search({term: storedSelectedDirectory.code})
      .then((results) => {
        setSelectedDatacenter(results.results[0])
      })
  }, [storedSelectedDirectory.code])

  return (
    <div className='table'>
      <p className='tableTitle'>
        ЦОДы
      </p>
      <div className="input" >
        <p>Поиск:</p>
        <Input
          placeholder="Начните ввод кода или заголовка"
          className="select"
          allowClear
          value={search}
          onChange={(text) => {
            dispatch(setDatacenterSearchText(text.target.value))
            Datacenter.search({term: text.target.value})
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
                selectedDatacenter.code = code
                selectedDatacenter.title = title
                selectedDatacenter.description = description
                dispatch(setStoredSelectedDirectory(selectedDatacenter))
              }}
              onCancel={() => {
                dispatch(setModalActive())
                goBack()
              }} >
              <DirectoryModalWindow directory={selectedDatacenter} />
            </Modal>
          } />
      </Routes>
    </div>
  )
}