import React, { useState, useEffect, useRef } from "react";
import { StockData } from "./common/common";
import StockTable from "./components/StockTable";
import LineChart from "./components/LineChart";
import "./App.css";

const tickerURL = "ws://stocks.mnet.website/";

function App() {
  const [isTickerLive, setTickerStatus] = useState<boolean | null>(null);
  const connection = useRef<WebSocket | null>(null);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  // Contains latest tick data
  const [tickData, setTickData] = useState<{
    [key: string]: StockData;
  }>({});
  // Contains all the tick data since the page is loaded
  const [stocksData, setStockData] = useState<{
    [key: string]: Array<StockData>;
  }>({});

  useEffect(() => {
    document.title = "Stock ticker";
    connection.current = new WebSocket(tickerURL);

    connection.current.onclose = function () {
      setTickerStatus(false);
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
    let dataFetched: boolean = false;
    let data: {
      [key: string]: Array<StockData>;
    } = Object.assign({}, stocksData);
    for (const key in tickData) {
      dataFetched = true;
      if (data[key] != null) {
        data[key].push(tickData[key]);
      } else {
        data[key] = [tickData[key]];
      }
    }
    setStockData(data);
    if (dataFetched && !isTickerLive) {
      setTickerStatus(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickData]); // Should be dependent on only last tick data

  const onStockSelected: Function = (stock: string) => {
    setSelectedStock(stock);
  };

  return (
    <div className="App">
      <div id="container" className="app-body">
        {isTickerLive == null && <div>Loading...</div>}
        {isTickerLive === false && (
          <div>Connection lost, please reload the page</div>
        )}
        {isTickerLive && (
          <StockTable
            data={stocksData}
            onStockSelected={onStockSelected}
          ></StockTable>
        )}
        {isTickerLive && selectedStock && (
          <LineChart
            data={stocksData[selectedStock]}
            selectedStock={selectedStock}
          ></LineChart>
        )}
      </div>
    </div>
  );
}

export default App;
