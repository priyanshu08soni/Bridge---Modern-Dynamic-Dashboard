import Dashboard from '@/components/shared/Dashboard'
import { Chart } from '@/components/shared/Chart';
import { fetchDashboardData } from '@/lib/actions/data.action';
import React from 'react'

const page =async () => {
  const  {dashboard, message, status} =await fetchDashboardData();
  let dashboardData = dashboard?.userMetrics;
  return (
    <div className="main-container">
      <div>
        <section className="home">
          <h1 className="home-heading">User</h1>
        </section>
        <Dashboard
          dashboardData = {dashboardData}
          title = {"User"}
        />
      </div>
    </div>
  )
}

export default page
