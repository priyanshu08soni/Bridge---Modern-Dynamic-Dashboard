import Dashboard from '@/components/shared/Dashboard';
import { fetchDashboardData } from '@/lib/actions/data.action';
import React from 'react'

const page = async() => {
  const  {dashboard, message, status} =await fetchDashboardData();
  let dashboardData = dashboard?.engagementMetrics;
  return (
    <div className='main-container'>
      <div>
      <section className='home' >
        <h1 className='home-heading' >
          Engagement
        </h1>
      </section>
      <Dashboard dashboardData = {dashboardData} title = {"Engagement"} />
    </div>
    </div>
  )
}

export default page
