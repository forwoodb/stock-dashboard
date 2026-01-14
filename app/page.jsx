"use client";
import { useState, useEffect } from "react";
import Form from "next/form";
import Button from "./components/Button";
import { useRouter } from "next/navigation";
import EditForm from "./components/EditForm";

export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState({
    ticker: "",
    company: "",
    averageCost: "",
  });
  const [edit, setEdit] = useState(false);
  const [updateStock, setUpdateStock] = useState();

  const router = useRouter();

  const fetchData = () => {
    fetch("/api/tracker/stocks")
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
  }, []);

  const handleLogout = () => {
    fetch("/api/auth/logout");
    router.push("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStock((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/tracker/stocks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newStock),
    }).then(() => {
      return fetchData();
    });

    setNewStock({
      ticker: "",
      company: "",
      averageCost: "",
    });
  };

  const deleteStock = (id) => {
    fetch(`/api/tracker/stocks/${id}`, {
      method: "DELETE",
    });

    const list = stocks.filter((item) => {
      return item._id !== id;
    });

    setStocks(list);
    console.log(id);
  };

  const editStock = (stock) => {
    setEdit(true);
    setUpdateStock(stock);
    console.log(stock);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;

    setUpdateStock((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const id = updateStock._id;

    fetch(`/api/tracker/stocks/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateStock),
    }).then(() => {
      setEdit(false);
      fetchData();
    });
    // console.log(id);
  };

  return (
    <>
      <main>
        <Button click={handleLogout}>Log Out</Button>
        {edit ? (
          <EditForm
            stock={updateStock}
            change={handleUpdateChange}
            submit={handleUpdateSubmit}
          />
        ) : (
          <>
            <div className="container m-auto">
              <Form onSubmit={handleSubmit} className="p-4 bg-gray-300">
                <div className="flex flex-col pb-4">
                  <label htmlFor="ticker">Ticker</label>
                  <input
                    type="text"
                    name="ticker"
                    value={newStock.ticker}
                    onChange={handleChange}
                    id="ticker"
                    className="bg-white"
                  />
                </div>
                <div className="input-group flex flex-col pb-4">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={newStock.company}
                    onChange={handleChange}
                    id="company"
                    className="bg-white"
                  />
                </div>
                <div className="input-group flex flex-col  pb-4">
                  <label htmlFor="averageCost">Average Cost</label>
                  <input
                    type="text"
                    name="averageCost"
                    value={newStock.averageCost}
                    onChange={handleChange}
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
                  {stocks.map((stock) => {
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
