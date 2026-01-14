import connectDB from "@/app/lib/db";
import { NextResponse } from "next/server";
import Stock from "@/app/models/Stock";

connectDB();

export async function PUT(req, { params }) {
  const { id } = await params;
  await Stock.findByIdAndUpdate(id, {
    position: false,
    watchList: true,
  });

  return NextResponse.json({ msg: "Added to watchlist" });
}
