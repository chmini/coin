import mongoose from "mongoose";

const InoutSchema = new mongoose.Schema({
  date: {
    type: String,
    required: "date is required",
  },
  inout: {
    type: String,
    required: "incExp is required",
  },
  asset: {
    type: String,
    required: "property is required",
  },
  category: {
    type: String,
    required: "group is required",
  },
  amount: {
    type: Number,
    required: "amount is required",
  },
});

const model = mongoose.model("Inout", InoutSchema);
export default model;
