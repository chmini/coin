import Cost from "../models/Cost";
import Property from "../models/Property";
import routes from "../routes";

const showDate = (strDate) => {
  const day = ["일", "월", "화", "수", "목", "금", "토"];
  const date = new Date(strDate);
  return `${date.getMonth() + 1}월 ${date.getDate()}일 ${
    day[date.getDay()]
  }요일`;
};

export const home = (req, res) => {
  res.render("home");
};

export const calendar = async (req, res) => {
  res.render("calendar");
};

export const add = (req, res) => {
  const {
    query: { date },
  } = req;
  const strDate = showDate(date);
  res.render("add", { strDate, date });
};

export const addtoDB = async (req, res) => {
  const {
    body: { date, incExp, property, group, amount, action },
  } = req;
  try {
    if (action === "save") {
      await Cost.create({
        date,
        incExp,
        property,
        group,
        amount,
      });
      // modify whole props
      const props = await Property.find({ property });
      const amt = Number(amount);
      if (property === "카드") {
        await Property.findOneAndUpdate(
          { property },
          { amount: props[0].amount + amt }
        );
      } else {
        if (incExp === "income") {
          await Property.findOneAndUpdate(
            { property },
            { amount: props[0].amount + amt }
          );
        } else {
          await Property.findOneAndUpdate(
            { property },
            { amount: props[0].amount - amt }
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

export const property = async (req, res) => {
  try {
    const props = await Property.find({});
    let sum = 0;
    props.forEach((prop) => {
      if (prop.property === "카드") sum -= prop.amount;
      else sum += prop.amount;
    });
    res.render("property", { props, sum });
  } catch (error) {
    console.log(error);
  }
};

export const firstProperty = async (req, res) => {
  const {
    body: { property: props, amount },
  } = req;
  await props.forEach(async (item, index) => {
    await Property.create({
      property: item,
      amount: amount[index],
    });
  });
  res.redirect(`${routes.moneybook}${routes.property}`);
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
export const getData = async (req, res) => {
  const costs = await Cost.find({});
  res.json(costs);
};
