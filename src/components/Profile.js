import React from 'react'
import {CgProfile} from 'react-icons/cg'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {setKey} from '../store/memory'

export default function Profile({name}) {
  const dispatch = useDispatch()

  return (
    <Link to=''
      onClick={() => {
        dispatch(setKey(['']))
      }}>
      <div className="profile">
        <div className="icon"><CgProfile /></div>
        {name}
      </div>
    </Link>
  )
}