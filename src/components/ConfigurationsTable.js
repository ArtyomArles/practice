import React, {useState, useEffect} from 'react'
import {Table, Input} from 'antd'
import {Configuration} from '../models'
import {Columns} from '../data'
import {useDispatch, useSelector} from 'react-redux'
import {setConfigurationSearchText} from '../store/editFilter'

export default function ConfigurationsTable() {
  const [dataSource, setData] = useState([])
  const dispatch = useDispatch()
  const search = useSelector(state => state.filter.configurationSearchText)

  useEffect(() => {
    Configuration.search({term: search})
      .then(results => {
        setData(results.results)
      })
  }, [search])

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
        columns={Columns}
      />
    </div>
  )
}