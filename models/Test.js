import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
  title: String
});

const model = mongoose.model("Test", TestSchema);
export default model;
