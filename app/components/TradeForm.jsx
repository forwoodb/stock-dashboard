import Form from "next/form";
import Button from "./Button";

const TradeForm = ({ stock, submit, change }) => {
  return (
    <div className="container m-auto border border-black">
      <Form onSubmit={submit} className="p-4 bg-gray-300">
        <div className="flex flex-col pb-4">
          <label htmlFor="ticker" className="form-label">
            Stock Ticker
          </label>
          <input
            name="ticker"
            value={stock["ticker"]}
            onChange={change}
            type="text"
            id="ticker"
            className="bg-white"
          />
        </div>
        <div className="flex flex-col pb-4">
          <label htmlFor="type" className="form-label">
            Trade Type
          </label>
          <select name="type" id="type" className="bg-white capitalize">
            <option value="buy">buy</option>
            <option value="sell">sell</option>
          </select>
        </div>

        <div className="flex flex-col pb-4">
          <label htmlFor="averageCost" className="form-label">
            Price
          </label>
          <input
            name="price"
            value={stock["price"]}
            onChange={change}
            type="text"
            id="price"
            className="bg-white"
          />
        </div>
        <div className="flex flex-col pb-4">
          <label htmlFor="averageCost" className="form-label">
            Shares
          </label>
          <input
            name="shares"
            value={stock.positionSize / stock.price}
            onChange={change}
            type="text"
            id="shares"
            className="bg-white"
          />
        </div>
        <div className="flex flex-col pb-4">
          <label htmlFor="positionSize" className="form-label">
            Position Size
          </label>
          <input
            name="positionSize"
            value={stock["positionSize"]}
            onChange={change}
            type="text"
            id="positionSize"
            className="bg-white"
          />
        </div>
        <Button type="submit" className="bg-green-700 text-white">
          Trade
        </Button>
      </Form>
    </div>
  );
};

export default TradeForm;
