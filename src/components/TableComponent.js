import React, {useState, useEffect} from 'react'
import {
  // useSelector,
  useDispatch
} from 'react-redux'
import {AiOutlineCheck} from 'react-icons/ai'
import {RiChatNewLine} from 'react-icons/ri'
import {BsFillPersonCheckFill, BsPersonWorkspace} from 'react-icons/bs'
import {GiCancel} from 'react-icons/gi'
import {Table, Input, Button, Select, Modal} from 'antd'
import {Preorder, Configuration, Environment, PreorderType, Datacenter} from '../models'
import DropDownList from './DropDownList'
import {PageSizes, Statuses} from '../data'
import ModalWindow from './ModalWindow'
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import {confId, envId, dcId, iR} from './ModalWindow'
import {clearFilter, setConfiguration, setDatacenter, setEnvironment, setPreorder, setRegNumber, setReplication, setStatuses} from '../store/editFilter'


var filtres = {
  'regNumber': '',
  'preorderTypeId': null,
  'configurationId': null,
  'environmentId': null,
  'datacenterIds': [],
  'isReplication': null,
  'statuses': []
}

export default function TableComponent() {
  const [dataSource, setData] = useState([])
  const [countData, setCount] = useState(0)
  const [preorderTypesId, setPreorderTypesId] = useState([])
  const [codesConfigurations, setCodesConfigurations] = useState([])
  const [codesEnvironments, setCodesEnvironments] = useState([])
  const [datacenterIds, setDatacenterIds] = useState([])
  const [findText, setFindText] = useState(null)
  const [countItemsPerPage, setCountItemsPerPage] = useState(5)
  const [modalActive, setModalActive] = useState(false)
  const [visible, setVisible] = useState({display: ''})
  const [preorderTypeId, setPreorderTypeId] = useState(undefined)
  const [configurationId, setConfigurationId] = useState(undefined)
  const [environmentId, setEnvironmentId] = useState(undefined)
  const [datacenterId, setDatacenterId] = useState(undefined)
  const [isReplication, setIsReplication] = useState(undefined)
  const [status, setStatus] = useState(undefined)
  const [selectedPreorder, setSelectedPreorder] = useState({})

  const dispatch = useDispatch()

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Рег.номер',
      dataIndex: 'regNumber',
      key: 'regNumber',
      render: (text) => <p className='link'
        onMouseOver={() => {
          Preorder.find(text[0] + text[text.length - 1])
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
    Preorder.search(filtres)
      .then(results => {
        setData(results.results)
        setCount(results.count)
      })
    PreorderType.search()
      .then(results => {
        setPreorderTypesId(Array.prototype.map.call(results.results,
          (el) => ({'value': el.id, 'label': el.code})))
      })
    Configuration.search()
      .then(results => {
        setCodesConfigurations(Array.prototype.map.call(results.results,
          (el) => ({'value': el.id, 'label': el.code})))
      })
    Environment.search()
      .then(results => {
        setCodesEnvironments(Array.prototype.map.call(results.results,
          (el) => ({'value': el.id, 'label': el.code})))
      })
    Datacenter.search()
      .then(results => {
        setDatacenterIds(Array.prototype.map.call(results.results,
          (el) => ({'value': el.id, 'label': el.title})))
      })
  }, [])

  return (<div className="tableComponent">
    <Button
      className="filters"
      onClick={() => {
        if (visible.display === 'none') {
          setVisible({display: 'flex'})
        } else {
          setVisible({display: 'none'})
        }
      }}
    >Фильтры</Button>
    <div className="filter" id="filter" style={visible}>
      <div className="input" >
        <p>Рег. номер:</p>
        <Input
          placeholder="Начните ввод номера"
          className="select"
          allowClear
          value={findText}
          onChange={(text) => {
            setFindText(text.target.value)
            filtres.regNumber = text.target.value
            fillTable()
            dispatch(setRegNumber(text.target.value))
          }}
        />
      </div>
      <DropDownList
        title="Тип потребности:"
        options={preorderTypesId}
        state={preorderTypeId}
        onChange={(el) => {
          setPreorderTypeId(el)
          filtres.preorderTypeId = el
          dispatch(setPreorder(el))
          fillTable()
        }}
      />
      <DropDownList
        title="Конфигурация:"
        options={codesConfigurations}
        state={configurationId}
        onChange={(el) => {
          setConfigurationId(el)
          filtres.configurationId = el
          dispatch(setConfiguration(el))
          fillTable()
        }}
      />
      <DropDownList
        title="Среда:"
        options={codesEnvironments}
        state={environmentId}
        onChange={(el) => {
          setEnvironmentId(el)
          filtres.environmentId = el
          dispatch(setEnvironment(el))
          fillTable()
        }}
      />
      <DropDownList
        title="ЦОД:"
        options={datacenterIds}
        mode='multiple'
        state={datacenterId}
        onChange={(el) => {
          setDatacenterId(el)
          filtres.datacenterIds = el
          dispatch(setDatacenter(el))
          fillTable()
        }}
      />
      <DropDownList
        title="Признак репликации:"
        options={[{value: true, label: 'Да'}, {value: false, label: 'Нет'}]}
        state={isReplication}
        onChange={(el) => {
          setIsReplication(el)
          filtres.isReplication = el
          dispatch(setReplication(el))
          fillTable()
        }}
      />
      <DropDownList
        title="Статусы:"
        options={Statuses}
        mode='multiple'
        state={status}
        onChange={(el) => {
          setStatus(el)
          filtres.statuses = el
          dispatch(setStatuses(el))
          fillTable()
        }}
      />
      <Button onClick={() => {
        setPreorderTypeId(undefined)
        setConfigurationId(undefined)
        setEnvironmentId(undefined)
        setDatacenterId(undefined)
        setIsReplication(undefined)
        setStatus(undefined)
        setFindText(null)
        filtres = {
          'regNumber': '',
          'preorderTypeId': null,
          'configurationId': null,
          'environmentId': null,
          'datacenterIds': [],
          'isReplication': null,
          'statuses': []
        }
        dispatch(clearFilter())
        fillTable()
      }}>
        Очистить все фильтры
      </Button>
    </div>
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
        defaultValue={5}
        options={PageSizes}
        onChange={(el) => {
          setCountItemsPerPage(el)
        }}
      />
    </div>
    <Routes>
      <Route path={selectedPreorder.regNumber} element={
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

  function fillTable() {
    if (filtres.regNumber.length === 2) {
      Preorder.find(filtres.regNumber)
        .then(result => {
          if (result === undefined) {
            Preorder.search(filtres)
              .then(results => {
                setData(results.results)
                setCount(results.count)
              })
          } else {
            setData(new Array(result))
            setCount(1)
          }
        }
        )
    } else {
      Preorder.search(filtres)
        .then(results => {
          setData(results.results)
          setCount(results.count)
        })
    }
  }

}