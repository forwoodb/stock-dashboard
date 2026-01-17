import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import Stock from "@/app/models/Stock";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

connectDB();

export async function GET() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("jwt-sd");
  let token = null;
  if (cookie.value) {
    token = cookie.value;
  }
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(verify);

  const stocks = await Stock.find({ userId: verify._id });
  console.log(stocks);

  return NextResponse.json(stocks);
}

export async function POST(req) {
  const body = await req.json();
  const cookieStore = cookies();
  const cookie = (await cookieStore).get("jwt-sd");
  let token = null;
  if (cookie.value) {
    token = cookie.value;
  }
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  console.log(verify._id);

  const newStock = await new Stock({ ...body, userId: verify._id });
  await newStock.save();
  console.log(newStock);

  return NextResponse.json({ msg: "added" });
}
