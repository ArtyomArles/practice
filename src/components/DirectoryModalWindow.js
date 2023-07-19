import React from 'react'
import {Input} from 'antd'

const {TextArea} = Input

var code = undefined
var title = undefined
var description = undefined

export default function DirectoryModalWindow({directory}) {
  code = directory.code
  title = directory.title
  description = directory.description

  return (
    <div>
      <div className='headerModalWindow'>
        <p>{directory.code}</p>
      </div>
      <div className='mainModalWindow'>
        <div className='inputsMainModalWindow'>
          <div className='codeInputMainModalWindow'>
            <p>
              Код:
            </p>
            <Input
              className='directoryMainModalWindow'
              defaultValue={code}
              onChange={(e) => {
                code = e.target.value
              }} />
          </div>
          <div className='titleInputMainModalWindow'>
            <p>
              Заголовок:
            </p>
            <Input
              className='directoryMainModalWindow'
              defaultValue={title}
              onChange={(e) => {
                title = e.target.value
              }} />
          </div>
        </div>
        <div className='textareaMainModalWindow'>
          <p>
            Описание:
          </p>
          <TextArea
            defaultValue={description}
            style={{
              height: 120,
              resize: 'none',
            }}
            onChange={(e) => {
              description = e.target.value
            }}
          />
        </div>
      </div>
    </div>
  )
}

export {code, title, description}