import React, {useState, useEffect} from 'react'
import {Table, Input} from 'antd'
import {Environment} from '../models'
import {Columns} from '../data'
import {useDispatch, useSelector} from 'react-redux'
import {setEnvironmentSearchText} from '../store/editFilter'

export default function EnvironmentsTable() {
  const [dataSource, setData] = useState([])
  const dispatch = useDispatch()
  const search = useSelector(state => state.filter.environmentSearchText)

  useEffect(() => {
    Environment.search({term: search})
      .then(results => {
        setData(results.results)
      })
  }, [search])

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
        columns={Columns}
      />
    </div>
  )
}