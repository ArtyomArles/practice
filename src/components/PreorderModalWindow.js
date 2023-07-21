import React, {useState, useEffect} from 'react'
import {Select} from 'antd'
import {ImFolder} from 'react-icons/im'
import {Configuration, Environment, Datacenter} from '../models'
import {AiOutlineCheck} from 'react-icons/ai'
import {RiChatNewLine} from 'react-icons/ri'
import {BsFillPersonCheckFill, BsPersonWorkspace} from 'react-icons/bs'
import {GiCancel} from 'react-icons/gi'

var confId = undefined
var envId = undefined
var dcId = undefined
var iR = undefined

export default function PreorderModalWindow({preorder}) {
  const [configurationsId, setConfigurationsId] = useState(undefined)
  const [environmentsId, setEnvironmentsId] = useState(undefined)
  const [datacentersId, setDatacentesrId] = useState(undefined)
  const [isReplications, setIsReplications] = useState(undefined)
  confId = preorder.configurationId
  envId = preorder.environmentId
  dcId = preorder.datacenterIds
  iR = preorder.isReplication

  useEffect(() => {
    Configuration.search()
      .then(results => {
        setConfigurationsId(Array.prototype.map.call(results.results,
          (el) => ({'value': el.id, 'label': el.code})))
      })
    Environment.search()
      .then(results => {
        setEnvironmentsId(Array.prototype.map.call(results.results,
          (el) => ({'value': el.id, 'label': el.code})))
      })
    Datacenter.search()
      .then(results => {
        setDatacentesrId(Array.prototype.map.call(results.results,
          (el) => ({'value': el.id, 'label': el.title})))
      })
    setIsReplications([{value: true, label: 'Да'}, {value: false, label: 'Нет'}])
  }, [])

  return (
    <div className="modalWindow">
      <div className='titleModalWindow'>
        <div className='modalTitleAndIcon'>
          <ImFolder className='modalIcon' />
          <p className='modalTitle'>{preorder.regNumber}</p>
        </div>
        {(preorder.status === 'NEW') ?
          <div className="modalStatus new">
            <RiChatNewLine className="iconStatus" />
            Новый
          </div>
          : (preorder.status === 'APPROVED') ?
            (<div className="modalStatus approved">
              <BsFillPersonCheckFill className="iconStatus" />
              Одобренный
            </div>)
            : (preorder.status === 'IN_WORK') ?
              (<div className="modalStatus inWork">
                <BsPersonWorkspace className="iconStatus" />
                В работе
              </div>)
              : (preorder.status === 'COMPLETED') ?
                (<div className="modalStatus complited">
                  <AiOutlineCheck className="iconStatus" />
                  Завершенный
                </div>)
                :
                (<div className="modalStatus canceled">
                  <GiCancel className="iconStatus" />
                  Отмененный
                </div>)}
      </div>
      <div className='mainModalWindow'>
        <div className='confAndEnv'>
          <div className='configuration'>
            <p>Конфигурация:</p>
            <Select
              className="modalSelect"
              virtual={false}
              defaultValue={preorder.configurationId === null ? 'Отсутствует' : preorder.configurationId}
              options={configurationsId}
              onChange={(e) => {
                confId = e
              }}
            />
          </div>
          <div className='environment'>
            <p>Среда:</p>
            <Select
              className="modalSelect"
              virtual={false}
              defaultValue={preorder.environmentId}
              options={environmentsId}
              onChange={(e) => {
                envId = e
              }}
            />
          </div>
        </div>
        <div className='dataAndRepl'>
          <div className='datacenter'>
            <p>ЦОД:</p>
            <Select
              className="modalSelect"
              virtual={false}
              defaultValue={preorder.datacenterIds}
              mode='multiple'
              options={datacentersId}
              onChange={(e) => {
                dcId = e
              }}
            />
          </div>
          <div className='isReplication'>
            <p>Признак репликации:</p>
            <Select
              className="modalSelect"
              virtual={false}
              defaultValue={preorder.isReplication}
              options={isReplications}
              onChange={(e) => {
                iR = e
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export {confId, envId, dcId, iR}