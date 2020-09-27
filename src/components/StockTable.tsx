import React, { useState, useEffect } from "react";
import StockData from "../common/common";
import classNames from "classnames";

function StockTable(props: { data: { [key: string]: Array<StockData> } }) {
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [stocksData, setStocksData] = useState<{
    [key: string]: Array<StockData>;
  }>(props.data);

  useEffect(() => {
    setStocksData(props.data);
  }, [props]);

  setInterval(function () {
    setRefreshCounter(refreshCounter + 1);
  }, 1000);

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
          const stockValue = stockHistory[stockHistory.length - 1].value;
          const lastStockValue =
            stockHistory.length > 1
              ? stockHistory[stockHistory.length - 2].value
              : stockValue;
          const valueClass = classNames({
            red: lastStockValue > stockValue,
            green: stockValue > lastStockValue,
          });
          const timeDiff = Math.floor(
            (new Date().getTime() -
              stockHistory[stockHistory.length - 1].timeStamp.getTime()) /
              1000
          );
          const timeStr =
            timeDiff < 2 ? `${timeDiff} second ago` : `${timeDiff} seconds ago`;
          return (
            <tr key={stock_name}>
              <td className="capitalize">{stock_name}</td>
              <td className={valueClass}>{stockValue.toFixed(2)}</td>
              <td>{timeStr}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default StockTable;
