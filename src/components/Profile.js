import React from 'react'
import {CgProfile} from 'react-icons/cg'

export default function Profile({name}) {
  return (
    <div className="profile">
      <div className="icon"><CgProfile /></div>
      {name}
    </div>
  )
}