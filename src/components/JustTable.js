import React from 'react'
import {Table} from 'antd'

export default function JustTable({title, columns, dataSource}) {

  return (<div className='main'>
    <main>
      <p className='tableTitle'>{title}</p>
      <Table
        dataSource={dataSource}
        columns={columns}
      />
    </main>
  </div>
  )
}