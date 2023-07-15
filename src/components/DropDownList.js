import React from 'react'
import {Select} from 'antd'

export default function DropDownList({title, options, mode, onChange, state}) {

  return (
    <div className="dropDownList">
      <p>{title}</p>
      <Select
        className="select"
        id="select"
        virtual={false}
        value={state}
        mode={mode}
        options={options}
        allowClear
        onChange={(e) => {
          onChange(e)
        }}
      />
    </div>)
}