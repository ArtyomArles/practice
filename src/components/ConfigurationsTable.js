import React, {useState, useEffect} from 'react'
import {Table, Input} from 'antd'
import {Configuration} from '../models'
import {Columns} from '../data'
import {useDispatch} from 'react-redux'
import {setConfigurationSearchText} from '../store/editFilter'

var search = ''

export default function ConfigurationsTable() {
  const [dataSource, setData] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    Configuration.search({term: search})
      .then(results => {
        setData(results.results)
      })
  }, [])

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
          onChange={(text) => {
            search = text.target.value
            dispatch(setConfigurationSearchText(text.target.value))
            Configuration.search({term: search})
              .then(results => {
                setData(results.results)
              })
          }}
        />
      </div>
      <Table
        dataSource={dataSource}
        columns={Columns}
      />
    </div>
  )
}