"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import UpdateBalanceForm from "../components/UpdateBalanceForm";
import StopLossForm from "../components/StopLossForm";
import AccountPositions from "../components/AccountPositions";
import EditForm from "../components/EditForm";

const WatchList = () => {
  const [stocks, setStocks] = useState([]);
  const [accountBalance, setAccountBalance] = useState("");
  const [updateAccBal, setUpdateAccBal] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [updateStopLoss, setUpdateStopLoss] = useState("");
  const [edit, setEdit] = useState(false);
  const [updateStock, setUpdateStock] = useState();

  const router = useRouter();

  const fetchData = () => {
    fetch("/api/dashboard/positions")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data) {
          router.push("/login");
        }
        setStocks(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();

    const fetchLocalStorage = () => {
      const accBal = localStorage.getItem("accountBalance");
      console.log(accBal);
      setAccountBalance(accBal);

      const stopLoss = localStorage.getItem("stopLoss");
      console.log(stopLoss);
      setStopLoss(stopLoss);
    };

    fetchLocalStorage();
  }, []);

  const handleAccBalChange = (e) => {
    return setUpdateAccBal(e.target.value);
  };

  const handleStopLossChange = (e) => {
    return setUpdateStopLoss(e.target.value);
  };

  const updateAccountBalance = (e) => {
    e.preventDefault();
    localStorage.setItem("accountBalance", updateAccBal);
    setAccountBalance(updateAccBal);
    setUpdateAccBal("");
  };

  const updateSL = (e) => {
    e.preventDefault();
    localStorage.setItem("stopLoss", updateStopLoss);
    setStopLoss(updateStopLoss);
    setUpdateStopLoss("");
  };

  const addPosition = (id) => {
    fetch(`/api/dashboard/watch-list/${id}`, {
      method: "PUT",
    });
    // console.log(id);
    const list = stocks.filter((stock) => {
      return stock._id !== id;
    });
    setStocks(list);
  };

  const editStock = (stock) => {
    setEdit(true);
    setUpdateStock(stock);
    console.log(stock);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateStock((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitUpdate = (e) => {
    e.preventDefault();
    const id = updateStock._id;
    // console.log(id);

    fetch(`/api/dashboard/stocks/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateStock),
    }).then(() => {
      return fetchData();
    });

    setEdit(false);
  };

  const avgAmt = Number(accountBalance) / Number(stocks.length);
  const avgPos = avgAmt.toFixed(2);
  const maxAmt = Number(stopLoss) * Number(avgPos);
  const maxPos = maxAmt.toFixed(2);
  const stopLossDecimal = stopLoss / 100;

  const getEntryPrice = (close, ma) => {
    const entryPct = (close - ma) / close;
    const entryPrice = ((stopLossDecimal / entryPct) * avgAmt).toFixed(2);
    return entryPrice;
  };

  return (
    <>
      <main className="bg-gray-100">
        <div className="container m-auto">
          <h2 className="py-4 text-3xl">Watch List</h2>
          {edit ? (
            <EditForm
              stock={updateStock}
              submit={submitUpdate}
              change={handleChange}
            />
          ) : (
            <>
              <div className="md:flex mb-2">
                <div>
                  <UpdateBalanceForm
                    submit={updateAccountBalance}
                    value={updateAccBal}
                    change={handleAccBalChange}
                  />
                  <StopLossForm
                    submit={updateSL}
                    value={updateStopLoss}
                    change={handleStopLossChange}
                  />
                </div>
                <AccountPositions
                  accBal={accountBalance}
                  numPos={stocks.length}
                  avgPos={avgPos}
                  stopLoss={stopLoss}
                  maxPos={maxPos}
                />
              </div>
              <div className="container">
                <table
                  id="stock-table"
                  className="table table-auto w-full mx-auto mt-3 "
                >
                  <thead>
                    <tr>
                      <th scope="col" id="dataTickerCol">
                        Ticker
                      </th>
                      <th scope="col" id="timeCol">
                        Time
                      </th>
                      <th scope="col" id="closeCol">
                        Close
                      </th>
                      <th scope="col" id="fiveDCol">
                        5D
                      </th>
                      <th scope="col" id="tenDCol">
                        10D
                      </th>
                      <th scope="col" id="twentyDCol">
                        20D
                      </th>
                      <th scope="col" id="fiftyDCol">
                        50D
                      </th>
                      <th scope="col" id="avgCostCol">
                        Avg Cost
                      </th>
                      <th scope="col" id="posSizePctCol">
                        % &gt; MA
                      </th>
                      <th scope="col" id="posSizeCol">
                        Position Size
                      </th>
                      <th scope="col" id="entryCol">
                        Entry
                      </th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {stocks.map((stock) => {
                      if (
                        stock["watchList"] === true ||
                        stock["watchList"] === undefined
                      ) {
                        return (
                          <tr key={stock._id}>
                            <td>{stock["ticker"]}</td>
                            <td className="time">{stock["Time"]}</td>
                            <td className="close-price">{stock["Close"]}</td>
                            <td className="fifty">{stock["5D"]}</td>
                            <td className="fifty">{stock["10D"]}</td>
                            <td className="fifty">{stock["20D"]}</td>
                            <td className="fifty">{stock["50D"]}</td>
                            <td className="avg-cost">{stock["averageCost"]}</td>
                            <td className="pct-ma">
                              {(
                                ((Number(stock["Close"]) -
                                  Number(stock["10D"])) /
                                  Number(stock["10D"])) *
                                100
                              ).toFixed(2)}
                            </td>
                            <td className="pos-size">
                              {stock["positionSize"]}
                            </td>
                            <td className="entry">
                              {getEntryPrice(stock["Close"], stock["10D"])}
                            </td>
                            <td>
                              <Button
                                click={() => editStock(stock)}
                                className="bg-green-700 text-white"
                              >
                                Edit
                              </Button>
                            </td>
                            <td>
                              <Button
                                click={() => addPosition(stock._id)}
                                className="bg-green-700 text-white"
                              >
                                Position
                              </Button>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default WatchList;
