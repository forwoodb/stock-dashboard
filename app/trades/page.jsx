"use client";
import React, { useEffect } from "react";

const Transactions = () => {
  useEffect(() => {
    fetch("api/dashboard/trades")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);

        // return data
      });
  });

  return (
    <div>
      <h1>Transactions</h1>
    </div>
  );
};

export default Transactions;
