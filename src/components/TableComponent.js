import React, {useState, useEffect} from 'react'
import {AiOutlineCheck} from 'react-icons/ai'
import {RiChatNewLine} from 'react-icons/ri'
import {BsFillPersonCheckFill, BsPersonWorkspace} from 'react-icons/bs'
import {GiCancel} from 'react-icons/gi'
import {Table, Input, Button, Select} from 'antd'
import {Preorder, Configuration, Environment, PreorderType, Datacenter} from '../models'
import DropDownList from './DropDownList'
import {PageSizes, Statuses} from '../data'

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
    render: (text) => <a href="https://ya.ru/">{text}</a>,
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
        return (<div>true</div>)
      } else {
        return (<div>false</div>)
      }
    }
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
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

const filtres = {
  'regNumber': '',
  'preorderTypeId': null,
  'configurationId': null,
  'environmentId': null,
  'datacenterIds': [],
  'isReplication': null,
  'statuses': []
}

function openAndCloseFilters() {
  const filter = document.getElementById('filter')
  if (filter.style.display === 'none') {
    filter.style.display = ''
  } else {
    filter.style.display = 'none'
  }
}

export default function TableComponent() {
  const [dataSource, setData] = useState([])
  const [countData, setCount] = useState(0)
  const [preorderTypesId, setPreorderTypesId] = useState([])
  const [codesConfigurations, setCodesConfigurations] = useState([])
  const [codesEnvironments, setCodesEnvironments] = useState([])
  const [datacenterIds, setDatacenterIds] = useState([])
  const [buttonDisable, setButtonDisable] = useState(true)
  const [findText, setFindText] = useState(null)
  const [countItemsPerPage, setCountItemsPerPage] = useState(5)

  useEffect(() => {
    const filter = document.getElementById('filter')
    filter.style.display = 'none'
    Preorder.search()
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
        openAndCloseFilters()
      }}
    >Фильтры</Button>
    <div className="filter" id="filter">
      <div className="input" >
        <p>Рег. номер:</p>
        <Input
          placeholder="Начните ввод номера"
          className="select"
          value={findText}
          onChange={(text) => {
            setFindText(text.target.value)
            filtres.regNumber = text.target.value
            fillTable()
            if (text.target.value) {
              setButtonDisable(false)
            } else {
              setButtonDisable(true)
            }
          }}
        />
        <Button
          size="small"
          disabled={buttonDisable}
          onClick={() => {
            setFindText()
            filtres.regNumber = null
            setButtonDisable(true)
            fillTable()
          }}
        >Убрать фильтр</Button>
      </div>
      <DropDownList
        title="Тип потребности:"
        options={preorderTypesId}
        onChange={(el) => {
          filtres.preorderTypeId = el
          fillTable()
        }}
      />
      <DropDownList
        title="Конфигурация:"
        options={codesConfigurations}
        onChange={(el) => {
          filtres.configurationId = el
          fillTable()
        }}
      />
      <DropDownList
        title="Среда:"
        options={codesEnvironments}
        onChange={(el) => {
          filtres.environmentId = el
          fillTable()
        }}
      />
      <DropDownList
        title="ЦОД:"
        options={datacenterIds}
        onChange={(el) => {
          if (el === undefined) {
            filtres.datacenterIds = []
          } else {
            filtres.datacenterIds = [el]
          }
          fillTable()
        }}
      />
      <DropDownList
        title="Признак репликации:"
        options={[{value: true, label: 'true'}, {value: false, label: 'false'}]}
        onChange={(el) => {
          filtres.isReplication = el
          fillTable()
        }}
      />
      <DropDownList
        title="Статусы:"
        options={Statuses}
        onChange={(el) => {
          filtres.statuses = el
          fillTable()
        }}
      />
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
  </div>
  )
  function fillTable() {
    Preorder.search(filtres)
      .then(results => {
        setData(results.results)
        setCount(results.count)
      })
  }
}