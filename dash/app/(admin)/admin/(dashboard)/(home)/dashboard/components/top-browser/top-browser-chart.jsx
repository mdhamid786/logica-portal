"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import { getApiData } from "@/helper/common";
import { useEffect, useState } from "react";

const TopBrowserChart = ({ height = 350 }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const apiResData = await getApiData(`orders`);
        if (apiResData.success) {
          setData(apiResData.orders);
        } else {
          setError(apiResData.message || "Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching:", error);
        setError("Error fetching data");
      }
    };
    fetchOrders();
  }, []);

  const { theme: config } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);

 
  const statusCounts = data.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  const series = Object.values(statusCounts); 
  const labels = Object.keys(statusCounts); 

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    labels: labels,
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    stroke: {
      width: 0,
    },
    colors: [
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`,
      "#3B82F6",
      "#EF4444",
      "#F97400",
      "#FACC15",
      "#F97316",
      "#10B981",
      "#4B5563",
      "#9333EA",
    ],
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    legend: {
      position: "bottom",
      labels: {
        colors: `hsl(${theme?.cssVars[mode === "dark" || mode === "system" ? "dark" : "light"].chartLabel})`,
      },
    },
  };

  return (
    <>
      <Chart
        options={options}
        series={series}
        type="donut"
        height={height}
        width={"100%"}
      />
    </>
  );
};

export default TopBrowserChart;
