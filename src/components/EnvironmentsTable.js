import React, {useState, useEffect} from 'react'
import {Table, Input} from 'antd'
import {Environment} from '../models'
import {Columns} from '../data'
import {useDispatch} from 'react-redux'
import {setEnvironmentSearchText} from '../store/editFilter'

var search = ''

export default function EnvironmentsTable() {
  const [dataSource, setData] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    Environment.search({term: search})
      .then(results => {
        setData(results.results)
      })
  }, [])

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
          onChange={(text) => {
            search = text.target.value
            dispatch(setEnvironmentSearchText(text.target.value))
            Environment.search({term: search})
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