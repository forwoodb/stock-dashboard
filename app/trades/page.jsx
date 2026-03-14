"use client";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";

const Transactions = () => {
  const [trades, setTrades] = useState([]);
  useEffect(() => {
    fetch("api/dashboard/trades")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTrades(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Transactions</h1>
      <table className="w-[95%] m-auto">
        <thead>
          <th>Ticker</th>
          <th>PosSize</th>
          <th>Price</th>
          <th>Type</th>
          <th>5D</th>
          <th>10D</th>
          <th>20D</th>
          <th>50D</th>
          <th>100D</th>
          <th>200D</th>
          <th></th>
          <th></th>
        </thead>
        <tbody>
          {trades.map((trade) => {
            return (
              <tr key={trade._id}>
                <td>{trade.ticker}</td>
                <td>{trade.positionSize}</td>
                <td>{trade.price}</td>
                <td className="capitalize">{trade.type}</td>
                <td>{trade.fiveDayAvg}</td>
                <td>{trade.tenDayAvg}</td>
                <td>{trade.twentyDayAvg}</td>
                <td>{trade.fiftyDayAvg}</td>
                <td>{trade.oneHundredDayAvg}</td>
                <td>{trade.twoHundredDayAvg}</td>
                <td>
                  <Button border>Edit</Button>
                </td>
                <td>
                  <Button className="bg-red-600 text-white">Delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
