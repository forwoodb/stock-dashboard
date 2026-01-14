import Button from "./Button";

const StopLossForm = ({ submit, value, change }) => {
  return (
    <form
      onSubmit={submit}
      className="p-3 mb-3 md:mr-3 bg-white rounded border border-gray-300"
    >
      <div className="flex flex-col mb-3">
        <label htmlFor="stopLoss" className="form-label">
          Stop-Loss %
        </label>
        <input
          name="stopLoss"
          type="text"
          id="stopLoss"
          value={value}
          onChange={change}
          className="border border-gray-300 rounded"
        />
      </div>
      <Button className="bg-green-700 text-white" id="stop-loss-button">
        Update Stop-Loss
      </Button>
    </form>
  );
};

export default StopLossForm;
