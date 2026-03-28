import Stocks from "./components/Stocks";
import Stock from "@/app/models/Stock";
import connectDB from "@/app/lib/db";
import { getUserId } from "./lib/functions";
import { revalidatePath } from "next/cache";

const Home = async () => {
  connectDB();

  const userId = await getUserId();

  const data = await Stock.find({ userId }).lean();
  const stocks = JSON.parse(JSON.stringify(data));

  const createStock = async (formData) => {
    "use server";

    const data = Object.fromEntries(formData);

    const newStock = await new Stock({ ...data, userId });
    await newStock.save();

    revalidatePath("/");
  };

  const deleteStock = async (id) => {
    "use server";

    await Stock.findByIdAndDelete(id);

    revalidatePath("/");
  };

  const updateStockSubmit = async (formData) => {
    "use server";

    const data = Object.fromEntries(formData);
    console.log(data._id);
    await Stock.findByIdAndUpdate(data._id, data);

    revalidatePath("/");
  };

  return (
    <Stocks
      stocks={stocks}
      createStock={createStock}
      deleteStock={deleteStock}
      updateStockSubmit={updateStockSubmit}
    />
  );
};

export default Home;
