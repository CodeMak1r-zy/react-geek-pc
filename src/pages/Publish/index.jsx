import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Publish() {
  const [search, setSearch] = useSearchParams()
  const id = search.get('id')
  return (
    <div>Publish</div>
  )
}