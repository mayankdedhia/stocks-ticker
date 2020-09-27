import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const tickerURL = "ws://stocks.mnet.website/";

function App() {
  const [isTickerLive, setTickerStatus] = useState(false);
  const connection = useRef<WebSocket | null>(null);

  useEffect(() => {
    connection.current = new WebSocket(tickerURL);
    connection.current.onopen = () => {
      setTickerStatus(true);
    };
    connection.current.onmessage = (message) => {
      console.log(message.data);
    };
  }, []);

  useEffect(() => {
    console.log(`Ticker status changed : ${isTickerLive}`);
    if (isTickerLive) {
      const container = document.getElementById("container");
      if (container != null) {
        container.innerHTML = "Show table here";
      }
    }
  }, [isTickerLive]);

  return (
    <div className="App">
      <div id="container" className="app-body">
        <div>Connecting to the stock ticker</div>
      </div>
    </div>
  );
}

export default App;
