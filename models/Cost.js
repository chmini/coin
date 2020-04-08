import mongoose from "mongoose";

const CostSchema = new mongoose.Schema({
  date: {
    type: String,
    required: "date is required",
  },
  incExp: {
    type: String,
    required: "incExp is required",
  },
  type: {
    type: String,
    required: "type is required",
  },
  group: {
    type: String,
    required: "group is required",
  },
  amount: {
    type: Number,
    required: "amount is required",
  },
});

const model = mongoose.model("Cost", CostSchema);
export default model;
