import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// LineChart component
export const LineChart = (props:any) => {
  const { data, title }  = props;
  // Format date for X-axis ticks
  const isDailyData = () => {
    if (!data || data.length < 2) return true; // Default to daily if data is insufficient
    const firstDate = new Date(data[0].timestamp);
    const lastDate = new Date(data[data.length - 1].timestamp);
    const timeDiff = lastDate.getTime() - firstDate.getTime();
    return timeDiff <= 24 * 60 * 60 * 1000; // Check if data spans 1 day
  };
  const formatDate = (tick: string) => {
    const date = new Date(tick);
    return isDailyData()
      ? date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) // Show time
      : date.toLocaleDateString("en-US", { month: "short", day: "numeric" }); // Show date
  };
console.log(data);
  return (
    <div className="w-full h-80 rounded-md py-5 relative bg-gray-900">
      <h1 className="font-bold text-white text-xl text-center chart-heading">{title} : Chart Data</h1>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#312e81" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#312e81" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="count"
            stroke="#312e81"
            fillOpacity={1}
            strokeWidth={1}
            fill="url(#chartColor)"
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#374151",borderRadius:"10px",fontSize:"12px",height:"50px",lineHeight:"14px" }}
            itemStyle={{ color: "white" }}
          />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatDate}
            fontSize={12}
            tick={{ fill: "#818cf8" }}
          />
          <YAxis domain={["dataMin", "dataMax"]} fontSize={12} tick={{ fill: "#818cf8" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};


