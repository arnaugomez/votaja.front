import React from 'react'
import { CProps } from '../view-models/CProps'

export default function Description({children}: CProps) {
  return (
      <p className="text-sm text-gray-700">{children}</p>
  )
}
