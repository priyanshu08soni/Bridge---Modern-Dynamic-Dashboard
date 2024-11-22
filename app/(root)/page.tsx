import { Chart } from "@/components/shared/Chart";
import { fetchDashboardData } from "@/lib/actions/data.action";
import React from "react";
const Home = async () => {
  const { dashboard, message, status } = await fetchDashboardData();

  return (
    <div className="main-container">
      <h1 className="sub-heading px-5 py-2 mb-3 flex items-center ">
        <p className="text-white font-bold">Administrator Dashboard</p>
      </h1>
      <div className="barchart">
        <div className="chart">
          <Chart
            data={dashboard?.userMetrics?.allTime}
            title={"User - All Time Data"}
          />
        </div>
        <div className="chart">
          <Chart
            data={dashboard?.contentMetrics?.allTime}
            title={"Content - All Time Data"}
          />
        </div>
      </div>
      <div className="barchart">
        <div className="chart">
          <Chart
            data={dashboard?.engagementMetrics?.allTime}
            title={"Engagement - All Time Data"}
          />
        </div>
        <div className="chart">
          <Chart
            data={dashboard?.blockchainMetrics?.allTime}
            title={"Blockchain - All Time Data"}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
