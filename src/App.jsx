import React from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './routes'

export default function App() {
  const element = useRoutes(routes)
  return (
    <div className='App'>
      {element}
    </div>
  )
}