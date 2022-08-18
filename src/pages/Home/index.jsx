import React from 'react'
import Bar from '@/components/Bar'
import './index.scss'

export default function Home() {
  return (
    <div className='home'>
      <Bar
        title='主流框架满意度'
        xData={['React', 'Vue', 'Angular']}
        yData={[40, 50, 30]}
        style={{ width: '500px', height: '400px' }}
      />
      <Bar
        title='主流框架使用度'
        xData={['React', 'Vue', 'Angular']}
        yData={[70, 80, 40]}
        style={{ width: '300px', height: '200px' }}
      />
    </div >
  )
}