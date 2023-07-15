import React, {useState, useEffect} from 'react'
import {Table, Input} from 'antd'
import {Datacenter} from '../models'
import {Columns} from '../data'
import {useDispatch} from 'react-redux'
import {setDatacenterSearchText} from '../store/editFilter'

var search = ''

export default function DatacentersTable() {
  const [dataSource, setData] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    Datacenter.search({term: search})
      .then(results => {
        setData(results.results)
      })
  }, [])

  return (
    <div className='table'>
      <p className='tableTitle'>
        Среды
      </p>
      <div className="input" >
        <p>Поиск:</p>
        <Input
          placeholder="Начните ввод кода или заголовка"
          className="select"
          allowClear
          onChange={(text) => {
            search = text.target.value
            dispatch(setDatacenterSearchText(text.target.value))
            Datacenter.search({term: search})
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