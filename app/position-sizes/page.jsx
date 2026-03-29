import PositionSizes from "../components/PositionSizes";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import fs from "fs";
import { parse } from "csv-parse/sync";
import Stock from "@/app/models/Stock";
import connectDB from "../lib/db";
import { getUserId } from "../lib/functions";

const Page = async () => {
  connectDB();

  const userId = await getUserId();

  // get csv data
  const csv_file = fs.readFileSync("stockData.csv", "utf-8");
  const stockData = parse(csv_file, { columns: true, skip_empty_lines: true });

  // get stock data
  const data = await Stock.find({ userId }).lean(); // <-- "lean" strips mongoose document to js object
  const stocks = JSON.parse(JSON.stringify(data));

  // combine stock data with csv data
  const merge = stocks.map((stock) => {
    const csvRow = stockData.find((i) => {
      return i.ticker === stock.ticker;
    });
    return { ...stock, ...(csvRow || {}) };
  });

  return <PositionSizes merge={merge} />;
};

export default Page;
