import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  ticker: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: Number,
  dollarAmount: {
    type: Number,
    required: true,
  },
  fiveDayAvg: Number,
  tenDayAvg: Number,
  twentyDayAvg: Number,
  fiftyDayAvg: Number,
  oneHundredDayAvg: Number,
  twoHundredDayAvg: Number,
});

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);
