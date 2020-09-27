import React, { useState, useEffect, useRef } from "react";
import StockData from "./common/common";
import StockTable from "./components/StockTable";
import "./App.css";

const tickerURL = "ws://stocks.mnet.website/";

function App() {
  const [isTickerLive, setTickerStatus] = useState(false);
  const connection = useRef<WebSocket | null>(null);
  const [tickData, setTickData] = useState<{
    [key: string]: StockData;
  }>({});
  const [stocksData, setStockData] = useState<{
    [key: string]: Array<StockData>;
  }>({});

  useEffect(() => {
    connection.current = new WebSocket(tickerURL);
    connection.current.onopen = () => {
      setTickerStatus(true);
    };
    connection.current.onmessage = (message) => {
      if (message.data != null) {
        const currentStocksData: Array<Array<string | number>> = JSON.parse(
          message.data
        );
        if (currentStocksData != null) {
          let data: {
            [key: string]: StockData;
          } = {};
          const timestamp = new Date();
          currentStocksData.forEach(function (stockPair) {
            data[stockPair[0]] = {
              value: stockPair[1] as number,
              timeStamp: timestamp,
            };
          });
          setTickData(data);
        }
      }
    };
  }, []);

  useEffect(() => {
    let data: {
      [key: string]: Array<StockData>;
    } = Object.assign({}, stocksData);
    for (const key in tickData) {
      if (data[key] != null) {
        data[key].push(tickData[key]);
      } else {
        data[key] = [tickData[key]];
      }
    }
    setStockData(data);
  }, [tickData]);

  // useEffect(() => {
  //   console.log(`Ticker status changed : ${isTickerLive}`);
  //   if (isTickerLive) {
  //     const container = document.getElementById("container");
  //     if (container != null) {
  //       container.innerHTML = "Show table here";
  //     }
  //   }
  // }, [isTickerLive]);

  return (
    <div className="App">
      <div id="container" className="app-body">
        {!isTickerLive && <div>Connecting to the stock ticker</div>}
        {isTickerLive && <StockTable data={stocksData}></StockTable>}
      </div>
    </div>
  );
}

export default App;
