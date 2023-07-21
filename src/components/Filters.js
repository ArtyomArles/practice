import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Configuration, Environment, PreorderType, Datacenter} from '../models'
import DropDownList from './DropDownList'
import {Input, Button} from 'antd'
import {Statuses} from '../data'
import {
  clearFilter,
  setConfiguration,
  setDatacenter,
  setEnvironment,
  setPreorder,
  setRegNumber,
  setReplication,
  setStatuses
} from '../store/editFilter'

export default function Filters() {
  const [preorderTypesId, setPreorderTypesId] = useState([])
  const [codesConfigurations, setCodesConfigurations] = useState([])
  const [codesEnvironments, setCodesEnvironments] = useState([])
  const [datacenterIds, setDatacenterIds] = useState([])

  const dispatch = useDispatch()
  const filters = useSelector(state => state.filter)
  const visible = useSelector(state => state.memory.filtersCollapsed)

  useEffect(() => {
    PreorderType.search()
      .then(results => {
        setPreorderTypesId(Array.prototype.map.call(results.results,
          (el) => ({'value': el.id, 'label': el.code})))
      })
    Configuration.search()
      .then(results => {
        setCodesConfigurations(Array.prototype.map.call(results.results,
          (el) => ({'value': el.id, 'label': el.code})))
      })
    Environment.search()
      .then(results => {
        setCodesEnvironments(Array.prototype.map.call(results.results,
          (el) => ({'value': el.id, 'label': el.code})))
      })
    Datacenter.search()
      .then(results => {
        setDatacenterIds(Array.prototype.map.call(results.results,
          (el) => ({'value': el.id, 'label': el.title})))
      })
  }, [])

  return (
    <div className={visible ? 'collapsed' : 'filter'} id="filter">
      <div className="input" >
        <p>Рег. номер:</p>
        <Input
          placeholder="Начните ввод номера"
          className="select"
          allowClear
          value={filters.regNumber}
          onChange={(text) => {
            dispatch(setRegNumber(text.target.value))
          }}
        />
      </div>
      <DropDownList
        title="Тип потребности:"
        options={preorderTypesId}
        state={filters.preorderTypeId}
        onChange={(el) => {
          dispatch(setPreorder(el))
        }}
      />
      <DropDownList
        title="Конфигурация:"
        options={codesConfigurations}
        state={filters.configurationId}
        onChange={(el) => {
          dispatch(setConfiguration(el))
        }}
      />
      <DropDownList
        title="Среда:"
        options={codesEnvironments}
        state={filters.environmentId}
        onChange={(el) => {
          dispatch(setEnvironment(el))
        }}
      />
      <DropDownList
        title="ЦОД:"
        options={datacenterIds}
        mode='multiple'
        state={filters.datacenterIds}
        onChange={(el) => {
          dispatch(setDatacenter(el))
        }}
      />
      <DropDownList
        title="Признак репликации:"
        options={[{value: true, label: 'Да'}, {value: false, label: 'Нет'}]}
        state={filters.isReplication}
        onChange={(el) => {
          dispatch(setReplication(el))
        }}
      />
      <DropDownList
        title="Статусы:"
        options={Statuses}
        mode='multiple'
        state={filters.statuses}
        onChange={(el) => {
          dispatch(setStatuses(el))
        }}
      />
      <Button onClick={() => {
        dispatch(clearFilter())
      }}>
        Очистить все фильтры
      </Button>
    </div>
  )
}