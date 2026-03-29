"use client";
import Button from "../components/Button";

const Transactions = ({ trades, deleteTrade }) => {
  const editTrade = (id) => {
    console.log(id);
  };

  return (
    <div>
      <h1>Transactions</h1>
      <table className="w-[95%] m-auto">
        <thead>
          <tr>
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
          </tr>
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
                  <Button click={() => editTrade(trade._id)} border>
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    click={() => deleteTrade(trade._id)}
                    className="bg-red-600 text-white"
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
  );
};

export default Transactions;
