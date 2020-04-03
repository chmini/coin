import Test from "../models/Test";

export const home = async (req, res) => {
  try {
    const tests = await Test.find({});
    console.log(tests);
    res.render("home", { tests });
  } catch (error) {
    console.log(error);
    res.render("home", { tests: [] });
  }
};
