"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import { getGridConfig, getYAxisConfig } from "@/lib/appex-chart-options";
import { getApiData } from "@/helper/common";
import { useEffect, useState } from "react";

const RevinueChart = ({ height = 375 }) => {
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

  const allMonths = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Parse data to group by order_date and status, but include all months
  const statusData = allMonths.reduce(
    (acc, month) => {
      acc[month] = { NetProfit: 0, Orders: 0, Return: 0 };
      return acc;
    },
    {}
  );

  data.forEach((item) => {
    const month = new Date(item.order_date).toLocaleString("default", {
      month: "short",
    });
    if (statusData[month]) {
      switch (item.status) {
        case "completed":
          statusData[month].Orders += 1;
          break;
        case "cancelled":
          statusData[month].Return += 1;
          break;
        default:
          statusData[month].NetProfit += 1;
          break;
      }
    }
  });

  const series = [
    {
      name: "Net Profit",
      data: allMonths.map((month) => statusData[month].NetProfit),
    },
    {
      name: "Orders",
      data: allMonths.map((month) => statusData[month].Orders),
    },
    {
      name: "Return",
      data: allMonths.map((month) => statusData[month].Return),
    },
  ];

  const { theme: config } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      stacked: true,
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: false,
        columnWidth: "20%",
        dataLabels: {
          total: {
            enabled: false,
            offsetX: 0,
            style: {
              colors: [
                `hsl(${
                  theme?.cssVars[
                    mode === "dark" || mode === "system" ? "dark" : "light"
                  ].chartLabel
                })`,
              ],
              fontSize: "13px",
              fontWeight: 800,
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
      width: 1,
      colors: [
        `hsl(${
          theme?.cssVars[
            mode === "dark" || mode === "system" ? "dark" : "light"
          ].chartLabel
        })`,
      ],
    },
    colors: [
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`,
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].info})`,
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].warning})`,
    ],
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
    },
    grid: getGridConfig(
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartGird})`
    ),
    yaxis: getYAxisConfig(
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`
    ),
    xaxis: {
      categories: allMonths,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: `hsl(${
            theme?.cssVars[
              mode === "dark" || mode === "system" ? "dark" : "light"
            ].chartLabel
          })`,
          fontSize: "12px",
        },
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "12px",
      fontWeight: 500,
      labels: {
        colors: `hsl(${
          theme?.cssVars[
            mode === "dark" || mode === "system" ? "dark" : "light"
          ].chartLabel
        })`,
      },
      itemMargin: {
        horizontal: 16,
        vertical: 10,
      },
      markers: {
        width: 10,
        height: 10,
        radius: 10,
      },
    },
  };

  return (
    <>
      <Chart
        options={options}
        series={series}
        type="bar"
        height={height}
        width={"100%"}
      />
    </>
  );
};

export default RevinueChart;
