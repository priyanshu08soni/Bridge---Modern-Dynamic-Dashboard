"use client";
import React, { useState } from "react";
import { Chart } from "./Chart";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { LineChart } from "./LineChart";

const Dashboard = (props: any) => {
  const { dashboardData, title } = props;
  const [daily, setDaily] = useState(true);

  const handleToggle = () => setDaily(!daily);

  // creating dailyData
  let dailyData = dashboardData?.daily;
  dailyData = Object.fromEntries(
    Object.entries(dailyData).slice(0, Object.keys(dailyData).length - 1)
  );

  //creating monthlyData
  let monthlyData = dashboardData?.monthly;
  monthlyData = Object.fromEntries(
    Object.entries(monthlyData).slice(0, Object.keys(monthlyData).length - 1)
  );

  //creating Daily Chart Data
  let dailyChartData = dashboardData?.daily;
  dailyChartData = Object.fromEntries(Object.entries(dailyChartData).slice(-1));

  //creating Monthly Chart Data
  let monthlyChartData = dashboardData?.monthly;
  monthlyChartData = Object.fromEntries(
    Object.entries(monthlyChartData).slice(-1)
  );

  // Selecting current chart data based on the toggle
  const chartData = daily
    ? dailyChartData?.chartData
    : monthlyChartData?.chartData;
  // Calculating metrics and timestamps
  const calculateMetrics = (data: any[]) => {
    if (!data || data.length === 0)
      return {
        average: 0,
        highest: { value: 0, timestamp: "" },
        lowest: { value: 0, timestamp: "" },
      };

    const values = data.map((item: any) => item.count || 0);
    const timestamps = data.map((item: any) => item.timestamp);

    const highestIndex = values.indexOf(Math.max(...values));
    const lowestIndex = values.indexOf(Math.min(...values));

    return {
      average:
        values.reduce((sum: number, value: number) => sum + value, 0) /
        values.length,
      highest: {
        value: values[highestIndex],
        timestamp: timestamps[highestIndex],
      },
      lowest: {
        value: values[lowestIndex],
        timestamp: timestamps[lowestIndex],
      },
    };
  };

  const metrics = calculateMetrics(chartData || []);

  // Formatting date and time based on daily/monthly toggle
  const formatTimestamp = (timestamp: string, isDaily: boolean) => {
    const date = new Date(timestamp);
    return isDaily
      ? date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      : date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
  };

  return (
    <section className="sm:mt-8">
      <h1 className="sub-heading px-5 py-2 flex items-center ">
        <p className="text-white font-bold">{title} : Management</p>
        <Button>
          Daily
          <Switch checked={!daily} onCheckedChange={handleToggle} />
          Monthly
        </Button>
      </h1>

      <div className="charts">
        <div className="barchart">
          <div className="chart">
            <Chart
              data={dashboardData?.allTime}
              title={`${title} - All Time Data`}
            />
          </div>
          <div className="chart">
            <Chart
              data={daily === true ? dailyData : monthlyData}
              title={
                daily === true
                  ? `${title} - Daily Data`
                  : `${title} - Monthly Data`
              }
            />
          </div>
        </div>
        <div className="metrics my-3 p-4 bg-gray-800 rounded-md text-white">
          <h2 className="text-lg font-bold mb-3 chart-heading">{title} - Chart Analysis</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="metric-item">
              <p className="text-sm text-gray-400">Average</p>
              <p className="text-lg font-semibold">
                {metrics.average.toFixed(2)}
              </p>
            </div>
            <div className="metric-item">
              <p className="text-sm text-gray-400">Highest</p>
              <p className="text-lg font-semibold">{metrics.highest.value}</p>
              <p className="text-sm">
                {formatTimestamp(metrics.highest.timestamp, daily)}
              </p>
            </div>
            <div className="metric-item">
              <p className="text-sm text-gray-400">Lowest</p>
              <p className="text-lg font-semibold">{metrics.lowest.value}</p>
              <p className="text-sm">
                {formatTimestamp(metrics.lowest.timestamp, daily)}
              </p>
            </div>
          </div>
        </div>
        <div className="my-3">
          <LineChart data={chartData} title={title} />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
