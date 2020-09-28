export type StockData = { value: number; timeStamp: Date };

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        type: "time",
        distribution: "linear",
        ticks: {
          source: "auto",
        },
        time: {
          displayFormats: { second: "h:mm:ss a" },
          unit: "second",
        },
        scaleLabel: {
          display: true,
          labelString: "Time",
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          stepValue: 10,
          steps: 10,
        },
        scaleLabel: {
          display: true,
          labelString: "Price ($)",
        },
      },
    ],
  },
  pan: {
    enabled: true,
    mode: "x",
  },
  zoom: {
    enabled: true,
    drag: false,
    mode: "x",
  },
};
