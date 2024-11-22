import Dashboard from "@/components/shared/Dashboard";
import { Chart } from "@/components/shared/Chart";
import { fetchDashboardData } from "@/lib/actions/data.action";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const page = async () => {
  const  {dashboard, message, status} =await fetchDashboardData();

  let dashboardData = dashboard?.contentMetrics;
  return (
    <div className="main-container">
      <div>
        <section className="home">
          <h1 className="home-heading">Content</h1>
        </section>
        <Dashboard
          dashboardData = {dashboardData}
          title = {"Content"}
        />
      </div>
    </div>
  );
};

export default page;
