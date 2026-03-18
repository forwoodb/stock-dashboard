import { cookies } from "next/headers";
import Stocks from "./components/Stocks";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import Stock from "@/app/models/Stock";
import connectDB from "@/app/lib/db";

const Page = async () => {
  connectDB();

  const cookieStore = await cookies();
  const cookie = cookieStore.get("jwt-sd");
  if (!cookie) {
    redirect("/login");
  }

  let token = null;
  if (cookie.value) {
    token = cookie.value;
  }
  const verify = jwt.verify(token, process.env.JWT_SECRET);

  const data = await Stock.find({ userId: verify._id }).lean();
  const stocks = JSON.parse(JSON.stringify(data));

  return <Stocks stocks={stocks} />;
  // return <Stocks />;
};

export default Page;
