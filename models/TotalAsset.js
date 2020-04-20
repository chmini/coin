import mongoose from "mongoose";

const TotalAssetSchema = new mongoose.Schema({
  asset: {
    type: String,
    required: "property is required",
  },
  amount: {
    type: Number,
    required: "amount is required",
  },
});

const model = mongoose.model("TotalAsset", TotalAssetSchema);
export default model;
