import Inout from "../models/InOut";
import TotalAsset from "../models/TotalAsset";
import routes from "../routes";

const dateString = (dateCode) => {
  const day = ["일", "월", "화", "수", "목", "금", "토"];
  const date = new Date(dateCode);

  const strMonth = date.getMonth() + 1;
  const strDate = date.getDate();
  const strDay = day[date.getDay()];

  return `${strMonth}월 ${strDate}일 ${strDay}요일`;
};

export const home = (req, res) => {
  res.render("home");
};

export const calendar = async (req, res) => {
  res.render("calendar", { inout: [] });
};

export const addInout = (req, res) => {
  const {
    query: { date },
  } = req;
  const strDate = dateString(date);
  res.render("addInout", { strDate, date });
};

export const addInoutDB = async (req, res) => {
  const {
    body: { date, inout, asset, category, amount, action },
  } = req;
  try {
    if (action === "save") {
      await Inout.create({
        date,
        inout,
        asset,
        category,
        amount,
      });
      // modify whole props
      const totalAsset = await TotalAsset.find({ asset });
      const numAmount = Number(amount);
      console.log(totalAsset);
      if (asset === "카드") {
        await TotalAsset.findOneAndUpdate(
          { asset },
          { amount: totalAsset[0].amount + numAmount }
        );
      } else {
        if (inout === "income") {
          await TotalAsset.findOneAndUpdate(
            { asset },
            { amount: totalAsset[0].amount + numAmount }
          );
        } else {
          await TotalAsset.findOneAndUpdate(
            { asset },
            { amount: totalAsset[0].amount - numAmount }
          );
        }
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect(`${routes.moneybook}${routes.calendar}`);
  }
};

export const inoutDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  const inout = await Inout.findById(id);
  const date = dateString(inout.date);
  res.render("inoutDetail", { inout, date });
};

export const totalAsset = async (req, res) => {
  try {
    const totalAsset = await TotalAsset.find({});
    let sum = 0;
    totalAsset.forEach((asset) => {
      if (asset.asset === "카드") sum -= asset.amount;
      else sum += asset.amount;
    });
    res.render("totalAsset", { totalAsset, sum });
  } catch (error) {
    console.log(error);
  }
};

export const firstTotalAsset = async (req, res) => {
  const {
    body: { totalAsset, amount },
  } = req;
  await totalAsset.forEach(async (asset, index) => {
    await TotalAsset.create({
      asset,
      amount: amount[index],
    });
  });
  res.redirect(`${routes.moneybook}${routes.totalAsset}`);
};

export const daily = (req, res) => {
  res.render("daily");
};

export const weekly = (req, res) => {
  res.render("weekly");
};

export const monthly = (req, res) => {
  res.render("monthly");
};

// API
export const getInout = async (req, res) => {
  const {
    query: { date },
  } = req;
  try {
    let inout;
    if (date) inout = await Inout.find({ date });
    else inout = await Inout.find({});
    res.json(inout);
  } catch (error) {
    console.log(error);
  }
};
