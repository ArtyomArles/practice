import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {AiOutlineCheck} from 'react-icons/ai'
import {RiChatNewLine} from 'react-icons/ri'
import {BsFillPersonCheckFill, BsPersonWorkspace} from 'react-icons/bs'
import {GiCancel} from 'react-icons/gi'
import {Table, Button, Select, Modal} from 'antd'
import {Preorder} from '../models'
import {PageSizes} from '../data'
import ModalWindow from './PreorderModalWindow'
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import {confId, envId, dcId, iR} from './PreorderModalWindow'
import {editFiltersCollapsed, setPaginationPerPage} from '../store/memory'
import Filters from './Filters'

export default function PreordersTable() {
  const [dataSource, setData] = useState([])
  const [countData, setCount] = useState(0)
  const [modalActive, setModalActive] = useState(false)
  const [selectedPreorder, setSelectedPreorder] = useState({})

  const dispatch = useDispatch()
  const filtres = useSelector(state => state.filter)
  const countItemsPerPage = useSelector(state => state.memory.paginationPerPage)

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
              setSelectedPreorder(result)
            })
        }}
        onClick={() => {
          setModalActive(true)
        }}
      > <Link to={selectedPreorder.regNumber}>{text}</Link></p >,
    },
    {
      title: 'Тип потребности',
      dataIndex: 'preorderTypeId',
      key: 'preorderTypeId',
      width: 150,
      render: (text) => {
        if (text === 1) {
          return (<div>X86</div>)
        } else if (text === 2) {
          return (<div>SHD</div>)
        } else {
          return (<div>VIRT</div>)
        }
      },
    },
    {
      title: 'Тип конфигурации',
      dataIndex: 'configurationId',
      key: 'configurationId',
      width: 200,
      render: (text) => {
        if (text === 1) {
          return (<div>X86_R_2S_BIGDATA</div>)
        } else if (text === 2) {
          return (<div>X86_R_2S_GP_STANDART</div>)
        } else if (text === 3) {
          return (<div>X86_R_2S_KAFKA_L</div>)
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
        if (text === 1) {
          return (<div>PROD</div>)
        } else if (text === 2) {
          return (<div>TEST</div>)
        } else if (text === 3) {
          return (<div>NT</div>)
        } else {
          return (<div>DEV</div>)
        }
      }
    },
    {
      title: 'ЦОДы',
      dataIndex: 'datacenterIds',
      key: 'datacenterIds',
      render: (text) => {
        var result = ''
        for (var i = 0; i < text.length; i++) {
          if (text[i] === 1) {
            result += ' MЦОД'
          }
          if (text[i] === 2) {
            result += ' MЦОД2'
          }
          if (text[i] === 3) {
            result += ' MЦОД3'
          }
          if (text[i] === 4) {
            result += ' MЦОД4'
          }
          if (text[i] === 5) {
            result += ' Сколково'
          }
          if (text[i] === 6) {
            result += ' ШП'
          }
          if (text[i] === 7) {
            result += ' АЦОД'
          }
          if (text[i] === 8) {
            result += ' АЦОД2'
          }
        }
        return (result)
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
          path={selectedPreorder.regNumber}
          element={
            <Modal
              open={modalActive}
              title='Редактирование потребности'
              onOk={() => {
                setModalActive(false)
                goBack()
                selectedPreorder.configurationId = confId
                selectedPreorder.environmentId = envId
                selectedPreorder.datacenterIds = dcId
                selectedPreorder.isReplication = iR
              }}
              onCancel={() => {
                setModalActive(false)
                goBack()
              }} >
              <ModalWindow preorder={selectedPreorder} />
            </Modal>
          } />
      </Routes>
    </div>
  )
}