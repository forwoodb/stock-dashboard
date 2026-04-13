import connectDB from "@/app/lib/mongodb";
import { execFile } from "child_process";
import { NextResponse } from "next/server";

connectDB();

export async function GET() {
  execFile("python3", ["yahoo.py"]);
  return NextResponse.json({ msg: "yfinance" });
}
