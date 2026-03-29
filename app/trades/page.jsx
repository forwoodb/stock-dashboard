import Transactions from "../components/Transactions";
import { getUserId } from "../lib/functions";
import Transaction from "../models/Transaction";

const Page = async () => {
  const userId = await getUserId();

  const data = await Transaction.find().lean();
  const trades = JSON.parse(JSON.stringify(data));

  console.log(trades);

  return <Transactions trades={trades} />;
};

export default Page;
