"use client";
import Button from "./Button";
import Form from "next/form";

const EditTrade = ({ stock, submit }) => {
  return (
    <>
      <Form action={submit} className="p-4 bg-gray-300">
        <input hidden type="text" name="_id" defaultValue={stock._id} />
        <div className="flex flex-col pb-4">
          <label htmlFor="ticker" className="form-label">
            Stock Ticker
          </label>
          <input
            name="ticker"
            defaultValue={stock["ticker"]}
            type="text"
            id="ticker"
            className="bg-white"
          />
        </div>
        <div className="flex flex-col pb-4">
          <label htmlFor="type" className="form-label">
            Trade Type
          </label>
          <select
            name="type"
            id="type"
            defaultValue={"buy" || stock["type"]}
            className="bg-white capitalize"
          >
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
            defaultValue={stock["price"]}
            type="text"
            id="price"
            className="bg-white"
          />
        </div>
        <div className="flex flex-col pb-4">
          <label htmlFor="positionSize" className="form-label">
            Position Size
          </label>
          <input
            name="positionSize"
            defaultValue={stock["positionSize"]}
            type="text"
            id="positionSize"
            className="bg-white"
          />
        </div>
        <Button type="submit" className="bg-green-700 text-white">
          Update
        </Button>
      </Form>
    </>
  );
};

export default EditTrade;
