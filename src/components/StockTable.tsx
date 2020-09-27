import React, { useState, useEffect } from "react";
import StockData from "../common/common";

function StockTable(props: { data: { [key: string]: Array<StockData> } }) {
  const [stocksData, setStocksData] = useState<{
    [key: string]: Array<StockData>;
  }>(props.data);

  useEffect(() => {
    setStocksData(props.data);
  }, [props]);

  return (
    <table>
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Price</th>
          <th>Last Update</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(stocksData).map((stock_name) => {
          const stockHistory = stocksData[stock_name];
          const stockValue = stockHistory[
            stockHistory.length - 1
          ].value.toFixed(2);
          return (
            <tr key={stock_name}>
              <td>{stock_name}</td>
              <td>{stockValue}</td>
              <td>
                {stockHistory[stockHistory.length - 1].timeStamp.toISOString()}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default StockTable;
