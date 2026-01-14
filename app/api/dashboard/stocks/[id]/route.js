import connectDB from "@/app/lib/db";
import Stock from "@/app/models/Stock";
import { NextResponse } from "next/server";

connectDB();

export async function PUT(req, { params }) {
  const body = await req.json();
  const id = body._id;
  await Stock.findByIdAndUpdate(id, body);
  console.log(body);
  // console.log({ params });

  return NextResponse.json({ msg: "updated" });
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  await Stock.findByIdAndDelete(id);
  // console.log(id);

  return NextResponse.json({ msg: "delete" });
}
