import mongoose from "mongoose";

const AssetsSchema = new mongoose.Schema({
  moneyform: {
    type: String,
    required: "moneyform is required",
  },
  total: {
    type: Number,
    required: "total is required",
  },
});

const model = mongoose.model("Assets", AssetsSchema);
export default model;
