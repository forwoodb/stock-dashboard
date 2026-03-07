import connectDB from "@/app/lib/db";
import { NextResponse } from "next/server";

connectDB();

export async function POST(req) {
  const body = await req.json();
  console.log(body);
  return NextResponse.json({ msg: "trade" });
}
