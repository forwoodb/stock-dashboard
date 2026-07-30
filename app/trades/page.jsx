import { revalidatePath } from "next/cache";
import Transactions from "../components/Transactions";
import { getUserId } from "../lib/functions";
import Transaction from "../models/Transaction";

const Page = async () => {
  // const userId = await getUserId();

  const data = await Transaction.find().lean();
  const trades = JSON.parse(JSON.stringify(data));

  const deleteTrade = async (id) => {
    "use server";

    await Transaction.findByIdAndDelete(id);

    revalidatePath("/trades");
  };

  const updateTrade = async (formData) => {
    "use server";

    const data = Object.fromEntries(formData);

    await Transaction.findByIdAndUpdate(data._id, data);

    revalidatePath("/trades");
  };

  return (
    <Transactions
      trades={trades}
      submit={updateTrade}
      deleteTrade={deleteTrade}
    />
  );
};

export default Page;
