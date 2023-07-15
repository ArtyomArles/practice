import React, {useState} from 'react'
import {AiFillHeart} from 'react-icons/ai'
import {BsFillBookmarkFill} from 'react-icons/bs'
import {MdPhotoCamera, MdMap} from 'react-icons/md'
import {Link} from 'react-router-dom'
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons'
import {Button, Menu} from 'antd'

function getItem(label, key, icon, children, type) {

  return {
    key,
    icon,
    children,
    label,
    type,
  }
}

const items = [
  getItem(
    'Потребности',
    '1',
    <Link to="/preorders" >
      <AiFillHeart className='menuIcon' />
    </Link >),
  getItem(
    'Конфигурации',
    '2',
    <Link to="/configurations">
      <BsFillBookmarkFill className='menuIcon' />
    </Link>),
  getItem(
    'Среды',
    '3',
    <Link to="/environments">
      <MdPhotoCamera className='menuIcon' />
    </Link>),
  getItem(
    'ЦОДы',
    '4',
    <Link to="/dataCenters">
      <MdMap className='menuIcon' />
    </Link>)
]

export default function ListMenu() {
  const [collapsed, setCollapsed] = useState(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (<div className='menu'>
    <Button
      type="primary"
      onClick={toggleCollapsed}
    >
      {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </Button>
    <Menu className='selectPage'
      defaultOpenKeys={['sub1']}
      mode="inline"
      inlineCollapsed={collapsed}
      items={items} />
  </div>
  )
}