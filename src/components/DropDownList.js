import React, {useState} from 'react'
import {Button, Select} from 'antd'

export default function DropDownList({title, options, onChange}) {
  const [disabledButton, setDisabledButton] = useState(true)
  const [selectValue, setSelectValue] = useState(null)

  return (<div className="dropDownList">
    <p>{title}</p>
    <Select
      className="select"
      id="select"
      virtual={false}
      value={selectValue}
      options={options}
      onPopupScroll={() => { }}
      onChange={(e) => {
        setDisabledButton(false)
        setSelectValue(e)
        onChange(e)
      }}
    />
    <Button
      size="small"
      disabled={disabledButton}
      onClick={() => {
        setDisabledButton(true)
        setSelectValue('')
        onChange()
      }}
    >Убрать фильтр</Button>
  </div>)
}