import React, { useState, useEffect } from "react";
import { StockData, chartOptions } from "../common/common";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-zoom";

const lineData = {
  labels: [new Date()],
  datasets: [
    {
      label: "My First dataset",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [0],
    },
  ],
};

function LineChart(props: { selectedStock: string; data: Array<StockData> }) {
  const [stockData, setStockData] = useState<Array<StockData>>(props.data);

  useEffect(() => {
    setStockData(props.data);
  }, [props.data]);

  // This is only to refresh table every 1 second

  lineData.datasets[0].data = stockData.map((value: StockData) => {
    return value.value;
  });

  lineData.labels = stockData.map((value: StockData) => {
    return value.timeStamp;
  });

  lineData.datasets[0].label = props.selectedStock.toUpperCase();

  return (
    <div className="graph-container">
      <p>{`Graph: ${props.selectedStock.toUpperCase()}`}</p>
      <Line data={lineData} options={chartOptions}></Line>
    </div>
  );
}

export default LineChart;
