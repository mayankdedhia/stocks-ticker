import React, { useState, useEffect, useRef } from "react";
import StockData from "./common/common";
import StockTable from "./components/StockTable";
import "./App.css";

const tickerURL = "ws://stocks.mnet.website/";
const _stockData: {
  [key: string]: Array<StockData>;
} = {};

function App() {
  const [isTickerLive, setTickerStatus] = useState(false);
  const connection = useRef<WebSocket | null>(null);

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
          const timestamp = new Date();
          currentStocksData.forEach(function (stockPair) {
            const currentValue: StockData = {
              value: stockPair[1] as number,
              timeStamp: timestamp,
            };
            if (_stockData[stockPair[0]] != null) {
              _stockData[stockPair[0]].push(currentValue);
            } else {
              _stockData[stockPair[0]] = [currentValue];
            }
          });
        }
      }
    };
  }, []);

  return (
    <div className="App">
      <div id="container" className="app-body">
        {!isTickerLive && <div>Connecting to the stock ticker</div>}
        {isTickerLive && <StockTable data={_stockData}></StockTable>}
      </div>
    </div>
  );
}

export default App;
