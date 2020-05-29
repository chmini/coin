import routes from "../routes";
import category from "../category";
import Catalog from "../models/Catalog";
import Assets from "../models/Assets";
import SpendStats from "../models/SpendStats";

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const mkDateCode = (d) => {
  const date = new Date(d);
  return `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
};

const mkWeekly = (d) => {
  const date = new Date(d);
  return `${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }.${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
};

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
      el.total = numberWithCommas(el.total);
      el.catalog.forEach((e) => {
        e.amount = numberWithCommas(e.amount);
      });
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

const printDate = (date) => {
  const obj = new Object();
  const arr = [];
  obj.f = mkDateCode(date);
  let f, l;
  l = new Date(date.setDate(date.getDate() + 6));
  obj.l = mkDateCode(l);
  arr.push(obj);
  const ld = new Date(l.getFullYear(), l.getMonth() + 1, 0);
  while (l.getMonth() <= ld.getMonth()) {
    const obj = new Object();
    f = new Date(l.setDate(l.getDate() + 1));
    obj.f = mkDateCode(f);
    l = new Date(f.setDate(f.getDate() + 6));
    obj.l = mkDateCode(l);
    arr.push(obj);
    if (l.getDate() === ld.getDate()) break;
  }
  return arr;
};

export const weekly = async (req, res) => {
  const date = new Date();
  try {
    let flDate;
    const currentfirstDate = new Date(date.setDate(1));
    if (currentfirstDate.getDay() !== 0) {
      const prevlastDate = new Date(
        currentfirstDate.setDate(currentfirstDate.getDate() - 1)
      );
      const prevfirstDate = new Date(
        prevlastDate.setDate(prevlastDate.getDate() - prevlastDate.getDay())
      );
      flDate = printDate(prevfirstDate);
    } else {
      flDate = printDate(currentfirstDate);
    }

    const catalog = await Catalog.find({
      date: { $gte: flDate[0].f, $lte: flDate[flDate.length - 1].l },
    }).sort({ date: 1 });

    const aa = [];
    flDate.forEach((e, i) => {
      const arr = [];
      catalog.forEach((el) => {
        if (el.date >= e.f && el.date <= e.l) {
          arr.push(el);
        }
      });
      e.f = mkWeekly(e.f);
      e.l = mkWeekly(e.l);
      aa.push(arr);
    });

    aa.forEach((el, index) => {
      let i = 0,
        s = 0;
      el.forEach((e) => {
        if (e.type === "income") i += e.amount;
        else s += e.amount;
      });
      flDate[index].i = numberWithCommas(i);
      flDate[index].s = numberWithCommas(s);
    });

    res.render("weekly", { weeks: flDate });
  } catch (error) {
    console.log(error);
  }
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
