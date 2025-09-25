import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'



const DefaultLayout = () => {
  return (
    <div className='flex min-h-screen'>
         <div className='w-[20%] border'>
          <Sidebar/>
        </div>
        <div className='w-[80%]'>
          <Header/>
          <div className='m-4 px-3'><Outlet/></div>
        </div>
    </div>
    
  )
}

export default DefaultLayout