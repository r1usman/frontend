import React from 'react'
import IntroHeader from './Components/IntroHeader'

const Introduction = ({course}) => {
  return (
    <div className='py-6'>
        <IntroHeader language={course?.title}/>
        <div className='font-urbanist text-[14px] prose prose-slate dark:prose-invert max-w-none   px-6 rounded-sm'>
            <h1 className='text-3xl font-bold mt-4 mb-3 text-python-dark'>{course?.title} Introduction</h1>
            <p className='mb-4  leading-[25px] text-gray-700 text-[15px]'>
                {course?.description}
            </p>
        </div>
    </div>
  )
}

export default Introduction