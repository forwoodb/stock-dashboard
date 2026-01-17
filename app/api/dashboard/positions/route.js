import connectDB from "@/app/lib/db";
import { NextResponse } from "next/server";
import fs from "fs";
import { parse } from "csv-parse/sync";
import Stock from "@/app/models/Stock";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

connectDB();

export async function GET() {
  // Get user id
  const cookieStore = await cookies();
  const cookie = cookieStore.get("jwt-sd");
  let token = null;
  if (cookie.value) {
    token = cookie.value;
  }
  const verify = jwt.verify(token, process.env.JWT_SECRET);

  // get csv data
  const csv_file = fs.readFileSync("stockData.csv", "utf-8");
  const stockData = parse(csv_file, { columns: true, skip_empty_lines: true });
  // get stock data
  const stocks = await Stock.find({ userId: verify._id }).lean(); // <-- "lean" strips mongoose document to js object
  // combine stock data with csv data
  const merge = stocks.map((stock) => {
    const csvRow = stockData.find((i) => {
      return i.ticker === stock.ticker;
    });
    return { ...stock, ...(csvRow || {}) };
  });
  // console.log(merge);

  return NextResponse.json(merge);
  // return NextResponse.json({ msg: "merge" });
}
