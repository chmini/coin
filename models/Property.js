import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  property: {
    type: String,
    required: "property is required",
  },
  amount: {
    type: Number,
    required: "amount is required",
  },
});

const model = mongoose.model("Property", PropertySchema);
export default model;
