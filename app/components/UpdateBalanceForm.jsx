import Button from "./Button";

const UpdateBalanceForm = ({ submit, value, change }) => {
  return (
    <form
      onSubmit={submit}
      className="p-3 mb-3 md:mr-3 bg-white rounded border border-gray-300"
    >
      <div className="flex flex-col mb-3">
        <label htmlFor="accountBalance" className="form-label">
          Account Balance
        </label>
        <input
          name="accountBalance"
          type="text"
          id="accountBalance"
          value={value}
          onChange={change}
          className="border border-gray-300 rounded"
        />
      </div>
      <div className="form-text mb-3">
        Your account balance is stored in the browser, not a database. So you
        are the only one who sees it.
      </div>
      <Button id="acc-button" className="bg-green-700 text-white">
        Update Account Balance
      </Button>
    </form>
  );
};

export default UpdateBalanceForm;
