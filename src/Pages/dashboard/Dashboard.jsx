import React from 'react'
import DashboardNavBar from '../../components/layout/DashboardNavBar'
import { Outlet } from 'react-router-dom';

// This dashboard will show user profiles / orders / shops and products (if they are sellers)
export default function Dashboard() {
  return (
    <div className='row mx-0'>
      <div className='col-md-3 col-lg-2 p-0'>
        <DashboardNavBar/>
      </div>
      <div className='col-sm-10'>
        <Outlet/>
      </div>
    </div>
  )
}
