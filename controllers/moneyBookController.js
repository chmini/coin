import routes from "../routes";
import category from "../category";
import Catalog from "../models/Catalog";
import Assets from "../models/Assets";
import SpendStats from "../models/SpendStats";

const dateString = (dateCode) => {
  const day = ["일", "월", "화", "수", "목", "금", "토"];
  const date = new Date(dateCode);

  const strMonth = date.getMonth() + 1;
  const strDate = date.getDate();
  const strDay = day[date.getDay()];

  return `${strMonth}월 ${strDate}일 ${strDay}요일`;
};

const toDoubleDigit = (num) => {
  return num < 10 ? `0${num}` : num;
};

export const home = (req, res) => {
  res.render("home");
};

export const calendar = async (req, res) => {
  res.render("calendar");
};

export const createCatalog = (req, res) => {
  const {
    query: { date },
  } = req;
  const strDate = dateString(date);
  res.render("createCatalog", { strDate, date, category });
};

export const uploadCatalog = async (req, res) => {
  const {
    body: { date, type, moneyform, category, subCategory, amount, content },
  } = req;
  try {
    // message : input your assets
    if ((await Assets.find({})) !== []) {
      await Catalog.create({
        date,
        type,
        moneyform,
        category,
        subCategory,
        amount,
        content,
      });

      if (moneyform !== "카드") {
        // assets
        await Assets.findOneAndUpdate(
          { moneyform },
          {
            $inc: {
              total: type === "spend" ? -Number(amount) : Number(amount),
            },
          }
        );
      }

      // spendStats
      await SpendStats.findOneAndUpdate(
        { moneyform },
        {
          $inc: {
            total: type === "spend" ? Number(amount) : 0,
          },
        }
      );
    }
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect(`${routes.moneybook}${routes.calendar}`);
  }
};

export const catalogDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const catalog = await Catalog.findById(id);
    const strDate = dateString(catalog.date);
    res.render("catalogDetail", { catalog, strDate });
  } catch (error) {
    console.log(error);
  }
};

export const editCatalog = async (req, res) => {
  const {
    params: { id },
    body: { type, moneyform, category, subCategory, amount, content },
  } = req;
  try {
    const prevCatalog = await Catalog.findById(id);
    const {
      moneyform: prevMoneyform,
      type: prevType,
      amount: prevAmount,
    } = prevCatalog;

    await Catalog.findByIdAndUpdate(
      { _id: id },
      { type, moneyform, category, subCategory, amount, content }
    );

    if (prevMoneyform !== "카드") {
      await Assets.findOneAndUpdate(
        { moneyform: prevMoneyform },
        {
          $inc: {
            total: prevType === "spend" ? prevAmount : -prevAmount,
          },
        }
      );
    }

    await SpendStats.findOneAndUpdate(
      { moneyform: prevMoneyform },
      {
        $inc: {
          total: prevType === "spend" ? -prevAmount : 0,
        },
      }
    );

    if (moneyform !== "카드") {
      await Assets.findOneAndUpdate(
        { moneyform },
        {
          $inc: {
            total: type === "spend" ? -Number(amount) : Number(amount),
          },
        }
      );
    }

    await SpendStats.findOneAndUpdate(
      { moneyform },
      { $inc: { total: type === "spend" ? Number(amount) : 0 } }
    );
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect(`${routes.moneybook}${routes.calendar}`);
  }
};

export const deleteCatalog = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const prevCatalog = await Catalog.findById(id);
    const { moneyform, amount, type } = prevCatalog;

    await Catalog.findByIdAndRemove({ _id: id });

    if (moneyform !== "카드") {
      await Assets.findOneAndUpdate(
        { moneyform },
        {
          $inc: {
            total: type === "spend" ? Number(amount) : -Number(amount),
          },
        }
      );
    }

    await SpendStats.findOneAndUpdate(
      { moneyform },
      {
        $inc: {
          total: type === "spend" ? -Number(amount) : 0,
        },
      }
    );
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect(`${routes.moneybook}${routes.calendar}`);
  }
};

export const assets = async (req, res) => {
  try {
    const assets = await Assets.find({});
    let sum = 0;
    assets.forEach((asset) => {
      sum += asset.total;
    });

    const spendStats = await SpendStats.find({});

    res.render("assets", { assets, sum, spendStats });
  } catch (error) {
    console.log(error);
  }
};

export const firstAssets = async (req, res) => {
  const {
    body: { moneyform, total },
  } = req;

  await moneyform.forEach(async (moneyform, index) => {
    // assets
    await Assets.create({
      moneyform,
      total: total[index],
    });
    // spendstats
    await SpendStats.create({
      moneyform,
      total: 0,
    });
  });

  await SpendStats.create({
    moneyform: "카드",
    total: 0,
  });

  res.redirect(`${routes.moneybook}${routes.assets}`);
};

export const daily = async (req, res) => {
  const {
    query: { year, month },
  } = req;

  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    // to link (create catalog)
    const dateCode = `${currentYear}-${toDoubleDigit(
      currentMonth
    )}-${toDoubleDigit(currentDate.getDate())}`;

    let pattern, dpYear, dpMonth;
    if (year && month) {
      pattern = `${year}-${toDoubleDigit(Number(month))}`;
      dpYear = Number(year);
      dpMonth = Number(month);
    } else {
      pattern = `${currentYear}-${toDoubleDigit(currentMonth)}`;
      dpYear = currentYear;
      dpMonth = currentMonth;
    }

    // find in catalog DB by date
    const catalog = await Catalog.aggregate([
      {
        $match: { date: { $regex: pattern } },
      },
      {
        $group: {
          _id: { date: "$date", type: "$type" },
          total: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "catalogs",
          localField: "_id.date",
          foreignField: "date",
          as: "catalog",
        },
      },
    ]).sort({ _id: -1 });

    catalog.forEach((el) => {
      el._id.date = dateString(el._id.date);
    });

    // render
    res.render("daily", {
      catalog,
      dateCode,
      month: dpMonth,
      year: dpYear,
    });
  } catch (error) {
    console.log(error);
  }
};

export const weekly = (req, res) => {
  res.render("weekly");
};

export const monthly = async (req, res) => {
  res.render("monthly");
};

// API
export const getCatalog = async (req, res) => {
  const {
    query: { date },
  } = req;
  try {
    if (date) res.json(await Catalog.find({ date }));
    else res.json(await Catalog.find({}));
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = (req, res) => {
  res.json(category);
};

export const getStats = async (req, res) => {
  const stats = await Catalog.aggregate([
    { $match: { type: "spend" } },
    { $group: { _id: "$category", total: { $sum: "$amount" } } },
  ]);
  res.json(stats);
};
