"use client";
import { useState, useEffect } from "react";
import Form from "next/form";
import Button from "./Button";
import { useRouter } from "next/navigation";
import EditForm from "./EditForm";

export default function Stocks({
  stocks,
  createStock,
  deleteStock,
  updateStockSubmit,
}) {
  const [newStock, setNewStock] = useState({
    ticker: "",
    company: "",
    averageCost: "",
  });
  const [edit, setEdit] = useState(false);
  const [updateStock, setUpdateStock] = useState();

  const router = useRouter();

  const handleLogout = () => {
    fetch("/api/auth/logout");
    router.push("/login");
  };

  const editStock = (stock) => {
    setEdit(true);
    setUpdateStock(stock);
  };

  return (
    <>
      <main>
        <Button click={handleLogout}>Log Out</Button>
        {edit ? (
          <EditForm
            stock={updateStock}
            submit={(formData) => {
              updateStockSubmit(formData);
              setEdit("");
            }}
          />
        ) : (
          <>
            <div className="container m-auto">
              <Form action={createStock} className="p-4 bg-gray-300">
                <div className="flex flex-col pb-4">
                  <label htmlFor="ticker">Ticker</label>
                  <input
                    type="text"
                    name="ticker"
                    defaultValue={newStock.ticker}
                    id="ticker"
                    className="bg-white"
                  />
                </div>
                <div className="input-group flex flex-col pb-4">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    name="company"
                    defaultValue={newStock.company}
                    id="company"
                    className="bg-white"
                  />
                </div>
                <div className="input-group flex flex-col  pb-4">
                  <label htmlFor="averageCost">Average Cost</label>
                  <input
                    type="text"
                    name="averageCost"
                    defaultValue={newStock.averageCost}
                    id="averageCost"
                    className="bg-white"
                  />
                </div>

                <Button className="bg-green-700 text-white">Add Stock</Button>
              </Form>
            </div>
            <div className="container py-4 m-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th>Ticker</th>
                    <th>Company</th>
                    <th>Average Cost</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {stocks
                    .sort((a, b) => {
                      return a.ticker.localeCompare(b.ticker);
                    })
                    .map((stock) => {
                      return (
                        <tr key={stock._id}>
                          <td>{stock.ticker}</td>
                          <td>{stock.company}</td>
                          <td>{stock.averageCost}</td>
                          <td>
                            <Button click={() => editStock(stock)} border>
                              Edit
                            </Button>
                          </td>
                          <td>
                            <Button
                              click={() => deleteStock(stock._id)}
                              className="bg-red-800 text-white"
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </>
  );
}
