import connectDB from "@/app/lib/db";
import { NextResponse } from "next/server";
import Transaction from "@/app/models/Transaction";

connectDB();

export async function POST(req) {
  const body = await req.json();
  const trade = await new Transaction(body);
  await trade.save();
  return NextResponse.json({ msg: "trade" });
}
