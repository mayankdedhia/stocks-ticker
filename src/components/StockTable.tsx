import React, { useState, useEffect, useRef } from "react";
import { StockData } from "../common/common";
import classNames from "classnames";

function StockTable(props: {
  data: { [key: string]: Array<StockData> };
  onStockSelected: Function;
}) {
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const selectedRow = useRef<HTMLTableRowElement>();
  const intervalRef = useRef<NodeJS.Timeout>();

  // This is only to refresh table every 1 second
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(function () {
      setRefreshCounter(refreshCounter + 1);
    }, 1000);
  });

  // Handle selected row
  useEffect(() => {
    if (selectedRow.current) {
      const prevSelectedRows: HTMLCollectionOf<Element> = document.getElementsByClassName(
        "selected"
      );
      if (prevSelectedRows.length > 0) {
        prevSelectedRows[0].classList.remove("selected");
      }
      selectedRow.current.classList.add("selected");
    }
  }, [selectedStock]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Price ($)</th>
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
              timeDiff < 2
                ? `${timeDiff} second ago`
                : `${timeDiff} seconds ago`;

            // Each row represents data for a stock
            return (
              <tr
                key={stock_name}
                onClick={function (e) {
                  selectedRow.current = e.currentTarget;
                  setSelectedStock(stock_name);
                  if (props.onStockSelected) {
                    props.onStockSelected(stock_name);
                  }
                }}
              >
                <td className="capitalize">{stock_name}</td>
                <td className={valueClass}>{stockValue.toFixed(2)}</td>
                <td className="last-update">{timeStr}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>Click on any row to enable graph view.</p>
    </div>
  );
}

export default StockTable;
