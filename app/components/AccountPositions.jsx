import Button from "./Button";

const AccountPositions = ({
  accBal,
  numPos,
  avgPos,
  stopLoss,
  maxPos,
  click,
}) => {
  const runPython = () => {
    fetch("/api/tracker/run-python");
  };

  return (
    <div className="mb-3 w-[75%]">
      <div className="flex flex-col justify-between h-full p-4 rounded bg-white border border-gray-300">
        <p className="card-text">
          Account Balance: $<span id="account-balance">{accBal}</span>
        </p>
        <p className="card-text">
          Number of Positions: <span id="num-pos">{numPos}</span>
        </p>
        <p className="card-text">
          Average Position Size: $<span id="avg-pos-size">{avgPos}</span>
        </p>
        <p className="card-text">
          Stop-Loss: <span id="stop-loss">{stopLoss}</span>%
        </p>
        <p className="card-text">
          Maximum Position Size: $<span id="max-pos-size">{maxPos}</span>
        </p>
        <Button click={runPython} className="bg-green-700 text-white">
          Update Prices
        </Button>
      </div>
    </div>
  );
};

export default AccountPositions;
