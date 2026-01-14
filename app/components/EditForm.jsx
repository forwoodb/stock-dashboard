import Button from "./Button";
import Form from "next/form";

const EditForm = ({ stock, submit, change }) => {
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
          <label htmlFor="company" className="form-label">
            Company
          </label>
          <input
            name="company"
            value={stock["company"]}
            onChange={change}
            type="text"
            id="company"
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
        <div className="flex flex-col pb-4">
          <label htmlFor="averageCost" className="form-label">
            Average Cost
          </label>
          <input
            name="averageCost"
            value={stock["averageCost"]}
            onChange={change}
            type="text"
            id="averageCost"
            className="bg-white"
          />
        </div>
        <Button type="submit" className="bg-green-700 text-white">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditForm;
