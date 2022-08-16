import React from 'react'
import Bar from '@/components/Bar'

export default function Home() {
  return (
    <div>
      <Bar
        title='主流框架使用满意度'
        xData={['React', 'Vue', 'Angular']}
        yData={[40, 50, 30]}
        style={{ width: '500px', height: '400px' }}
      />
      <Bar
        title='主流框架使用满意度2'
        xData={['React', 'Vue', 'Angular']}
        yData={[70, 80, 40]}
        style={{ width: '300px', height: '200px' }}
      />
    </div>
  )
}