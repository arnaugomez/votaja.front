import React from 'react'
import SImg from '../../../common/view/atoms/SImg'

export default function HeroImg() {
  return (
        <figure className="relative h-20 overflow-hidden rounded">
          <SImg layout="fill" objectFit="cover" />
        </figure>
  )
}
