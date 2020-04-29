import mongoose from "mongoose";

const CatalogSchema = new mongoose.Schema({
  date: {
    type: String,
    required: "date is required",
  },
  type: {
    type: String,
    required: "type is required",
  },
  moneyform: {
    type: String,
    required: "moneyform is required",
  },
  category: {
    type: String,
    required: "category is required",
  },
  subCategory: String,
  amount: {
    type: Number,
    required: "amount is required",
  },
  content: String,
});

const model = mongoose.model("Catalog", CatalogSchema);
export default model;
