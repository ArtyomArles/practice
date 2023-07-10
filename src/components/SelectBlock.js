import React from 'react'
import SelectElement from './SelectElement'
import {AiFillHeart} from 'react-icons/ai'
import {BsFillBookmarkFill} from 'react-icons/bs'
import {MdPhotoCamera, MdMap} from 'react-icons/md'

export default function SelectBlock() {

  return (<div className="selectBlock" id="selectBlock">
    <SelectElement
      img={<AiFillHeart />}
      title="Потребности"
    />
    <SelectElement
      img={<BsFillBookmarkFill />}
      title="Конфигурации"
    />
    <SelectElement
      img={<MdPhotoCamera />}
      title="Среды"
    />
    <SelectElement
      img={<MdMap />}
      title="ЦОДы"
    />
  </div>
  )
}