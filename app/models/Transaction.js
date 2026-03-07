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
  shares: Number,
  positionSize: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Transaction ||
  mongoose.Model("Transaction", transactionSchema);
