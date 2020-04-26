import mongoose from "mongoose";

const SpendStats = new mongoose.Schema({
  moneyform: {
    type: String,
    required: "moneyform is required",
  },
  total: {
    type: Number,
    required: "total is required",
  },
});

const model = mongoose.model("SpendStats", SpendStats);
export default model;
