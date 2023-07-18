import React, {useState, useEffect} from 'react'
import {Table, Input} from 'antd'
import {Datacenter} from '../models'
import {Columns} from '../data'
import {useDispatch, useSelector} from 'react-redux'
import {setDatacenterSearchText} from '../store/searchText'

export default function DatacentersTable() {
  const [dataSource, setData] = useState([])
  const dispatch = useDispatch()
  const search = useSelector(state => state.searchText.datacenterSearchText)

  useEffect(() => {
    Datacenter.search({term: search})
      .then(results => {
        setData(results.results)
      })
  }, [search])

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
        columns={Columns}
      />
    </div>
  )
}