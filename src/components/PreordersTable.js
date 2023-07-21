import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {AiOutlineCheck} from 'react-icons/ai'
import {RiChatNewLine} from 'react-icons/ri'
import {BsFillPersonCheckFill, BsPersonWorkspace} from 'react-icons/bs'
import {GiCancel} from 'react-icons/gi'
import {Table, Button, Select, Modal} from 'antd'
import {Preorder} from '../models'
import {PageSizes} from '../data'
import PreorderModalWindow from './PreorderModalWindow'
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import {confId, envId, dcId, iR} from './PreorderModalWindow'
import {editFiltersCollapsed, setModalActive, setPaginationPerPage} from '../store/memory'
import {setStoredSelectedPreorder} from '../store/storedSelectedPreorder'
import Filters from './Filters'

export default function PreordersTable() {
  const [dataSource, setData] = useState([])
  const [countData, setCount] = useState(0)
  const [selectedPreorder, setSelectedPreorder] = useState(useSelector(state => state.storedSelectedPreorder))
  const storedSelectedPreorder = useSelector(state => state.storedSelectedPreorder)
  const dispatch = useDispatch()
  const filtres = useSelector(state => state.filter)
  const countItemsPerPage = useSelector(state => state.memory.paginationPerPage)
  const modalActive = useSelector(state => state.memory.modalActive)
  const preorderTypes = useSelector(state => state.memory.PreorderTypes)
  const configurations = useSelector(state => state.memory.Configurations)
  const environments = useSelector(state => state.memory.Environments)
  const datacenters = useSelector(state => state.memory.Datacenters)

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Рег. номер',
      dataIndex: 'regNumber',
      key: 'regNumber',
      render: (text) => <p className='link'
        onMouseOver={() => {
          Preorder.find(text)
            .then((result) => {
              dispatch(setStoredSelectedPreorder(result))
            })
        }}
        onClick={() => {
          dispatch(setModalActive())
        }}
      > <Link to={storedSelectedPreorder.regNumber}>{text}</Link></p >,
    },
    {
      title: 'Тип потребности',
      dataIndex: 'preorderTypeId',
      key: 'preorderTypeId',
      width: 150,
      render: (text) => {
        const preorderType = preorderTypes.filter(preorder =>
          preorder.id === text)
        return (
          <div>{preorderType[0].code}</div>
        )
      },
    },
    {
      title: 'Тип конфигурации',
      dataIndex: 'configurationId',
      key: 'configurationId',
      width: 200,
      render: (text) => {
        const configuration = configurations.filter(configuration =>
          configuration.id === text)
        if (!(configuration.length === 0)) {
          return (
            <div>{configuration[0].code}</div>
          )
        } else {
          return (<div>Отсутствует</div>)
        }
      }
    },
    {
      title: 'Среда',
      dataIndex: 'environmentId',
      key: 'environmentId',
      render: (text) => {
        const environment = environments.filter(environment =>
          environment.id === text)
        return (
          <div>{environment[0].code}</div>
        )
      }
    },
    {
      title: 'ЦОДы',
      dataIndex: 'datacenterIds',
      key: 'datacenterIds',
      render: (text) => {
        var result = ''
        const datacenter = datacenters.filter(datacenter =>
          text.includes(datacenter.id))
        for (var i = 0; i < datacenter.length; i++) {
          result += ` ${datacenter[i].title}`
        }
        return (
          <div>{result}</div>
        )
      }
    },
    {
      title: 'Признак репликации',
      dataIndex: 'isReplication',
      key: 'isReplication',
      width: 200,
      render: (text) => {
        if (text === true) {
          return (<div>Да</div>)
        } else {
          return (<div>Нет</div>)
        }
      }
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      width: 200,
      render: (text) => {
        if (text === 'NEW') {
          return (<div className="status new"><RiChatNewLine className="iconStatus" />Новый</div>)
        } else if (text === 'APPROVED') {
          return (<div className="status approved"><BsFillPersonCheckFill className="iconStatus" />Одобренный</div>)
        } else if (text === 'IN_WORK') {
          return (<div className="status inWork"><BsPersonWorkspace className="iconStatus" />В работе</div>)
        } else if (text === 'COMPLETED') {
          return (<div className="status complited"><AiOutlineCheck className="iconStatus" />Завершенный</div>)
        } else {
          return (<div className="status canceled"><GiCancel className="iconStatus" />Отмененный</div>)
        }
      }
    },
  ]
  
  const navigate = useNavigate()
  const goBack = () => navigate('/preorders')

  useEffect(() => {
    Preorder.debouncedSearch(filtres)
      .then(results => {
        setData(results.results)
        setCount(results.count)
      })
  }, [filtres])

  useEffect(() => {
    Preorder.find(storedSelectedPreorder.regNumber)
      .then((result) => {
        setSelectedPreorder(result)
      })
  }, [storedSelectedPreorder.regNumber])

  return (
    <div className="tableComponent">
      <Button
        className="filters"
        onClick={() => {
          dispatch(editFiltersCollapsed())
        }}
      >Фильтры</Button>
      <Filters />
      <p className="countData">Найдено: {countData}</p>
      <p className='tableTitle'>Потребности</p>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: countItemsPerPage
        }}
      />
      <div className="pagination">
        <p>Количество записей в таблице на странице:</p>
        <Select
          virtual={false}
          className="pageSize"
          defaultValue={countItemsPerPage}
          options={PageSizes}
          onChange={(el) => {
            dispatch(setPaginationPerPage(el))
          }}
        />
      </div>
      <Routes>
        <Route
          path={storedSelectedPreorder.regNumber}
          element={
            <Modal
              open={modalActive}
              title='Редактирование потребности'
              onOk={() => {
                dispatch(setModalActive())
                goBack()
                selectedPreorder.configurationId = confId
                selectedPreorder.environmentId = envId
                selectedPreorder.datacenterIds = dcId
                selectedPreorder.isReplication = iR
                dispatch(setStoredSelectedPreorder(selectedPreorder))
              }}
              onCancel={() => {
                dispatch(setModalActive())
                goBack()
              }} >
              <PreorderModalWindow preorder={selectedPreorder} />
            </Modal>
          } />
      </Routes>
    </div>
  )
}