import React, { useState } from "react";
import StockData from "../common/common";
import classNames from "classnames";

function StockTable(props: { data: { [key: string]: Array<StockData> } }) {
  const [refreshCounter, setRefreshCounter] = useState(0);

  // This is only to refresh table every 1 second
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
        {Object.keys(props.data).map((stock_name) => {
          const stockHistory = props.data[stock_name];
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

          // Each row represents data for a stock
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
