import routes from "../routes";
import category from "../category";
import Catalog from "../models/Catalog";
import Assets from "../models/Assets";
import SpendStats from "../models/SpendStats";

// FUNCTIONS
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const toDoubleDigit = (num) => {
  return num < 10 ? `0${num}` : num;
};

const dateToCode = (d) => {
  const date = new Date(d);
  return `${date.getFullYear()}-${toDoubleDigit(
    date.getMonth() + 1
  )}-${toDoubleDigit(date.getDate())}`;
};

const weeklyDateToCode = (d) => {
  const date = new Date(d);
  return `${toDoubleDigit(date.getMonth() + 1)}.${toDoubleDigit(
    date.getDate()
  )}`;
};

const dateToString = (d) => {
  const day = ["일", "월", "화", "수", "목", "금", "토"];
  const date = new Date(d);

  return `${date.getMonth() + 1}월 ${date.getDate()}일 ${
    day[date.getDay()]
  }요일`;
};

// CONTROLLER
export const home = (req, res) => {
  res.render("home");
};

export const calendar = async (req, res) => {
  /**
   * DATA PROCESS IN FE
   */
  res.render("calendar");
};

export const createCatalog = (req, res) => {
  const {
    query: { date },
  } = req;

  const dateString = dateToString(date);

  res.render("createCatalog", { strDate: dateString, date, category });
};

export const uploadCatalog = async (req, res) => {
  const {
    body: { date, type, moneyform, category, subCategory, amount, content },
  } = req;

  try {
    // IF ASSETS EXIST
    if ((await Assets.find({})) !== []) {
      // CREATE CATALOG
      await Catalog.create({
        date,
        type,
        moneyform,
        category,
        subCategory,
        amount,
        content,
      });

      /** POINT */

      // UPDATE ASSETS
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
      // UPDATE SPENDSTATS
      await SpendStats.findOneAndUpdate(
        { moneyform },
        {
          $inc: {
            total: type === "spend" ? Number(amount) : 0,
          },
        }
      );
    } else {
      /**
       * MESSAGE - INPUT YOUR FIRST ASSETS
       */
    }
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect(`${routes.moneybook}${routes.calendar}`);
  }
};

// CATALOG DETAIL
export const catalogDetail = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    // FIND
    const catalog = await Catalog.findById(id);

    const dateString = dateToString(catalog.date);

    res.render("catalogDetail", { catalog, strDate: dateString });
  } catch (error) {
    console.log(error);
  }
};

// EDIT CATALOG
export const editCatalog = async (req, res) => {
  const {
    params: { id },
    body: { type, moneyform, category, subCategory, amount, content },
  } = req;

  try {
    // PREVIOUS CATALOG - FOR COMPARE WHAT CHANGED
    const prevCatalog = await Catalog.findById(id);
    const {
      moneyform: prevMoneyform,
      type: prevType,
      amount: prevAmount,
    } = prevCatalog;
    // UPDATE CATALOG
    await Catalog.findByIdAndUpdate(
      { _id: id },
      { type, moneyform, category, subCategory, amount, content }
    );

    /** POINT */

    // UPDATE ASSETS
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
    // UPDATE SPENDSTATS
    await SpendStats.findOneAndUpdate(
      { moneyform: prevMoneyform },
      {
        $inc: {
          total: prevType === "spend" ? -prevAmount : 0,
        },
      }
    );
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

// DELETE CATALOG
export const deleteCatalog = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    // FOR UPDATE ASSETS AND SPENDSTATS
    const prevCatalog = await Catalog.findById(id);
    const { moneyform, amount, type } = prevCatalog;
    // DELETE
    await Catalog.findByIdAndRemove({ _id: id });

    /** POINT */

    // UPDATE ASSETS
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
    // UPDATE SPENDSTATS
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

// ASSETS
export const assets = async (req, res) => {
  /**
   * 1. DB를 CATALOG 하나만 쓰고 자산이나 지출내역은 합으로 처리
   * - 코드가 짧아지는데 데이터가 많아지면 많아질수록 느려질 가능성이 있음
   * - 데이터가 얼마나 많아질 것인가
   * 2. DB를 생성할 때 애초에 DB끼리 연동해서 DB내에서 합으로 처리
   * - 가능한지는 모르겠음.. 만약에 가능하다면 가장 베스트
   *
   * 현재 : 실시간 처리 처럼!
   * Catalog 생성, 수정, 삭제 시에 같이 변동되도록
   */

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

// FIRST ASSETS
export const firstAssets = async (req, res) => {
  const {
    body: { moneyform, total },
  } = req;

  /** POINT */

  await moneyform.forEach(async (moneyform, index) => {
    // ASSETS
    await Assets.create({
      moneyform,
      total: total[index],
    });
    // SPENDSTATS
    await SpendStats.create({
      moneyform,
      total: 0,
    });
  });
  // SPENDSTATS
  await SpendStats.create({
    moneyform: "카드",
    total: 0,
  });

  res.redirect(`${routes.moneybook}${routes.assets}`);
};

// DAILY
export const daily = async (req, res) => {
  const {
    query: { year, month },
  } = req;

  try {
    // CURRENT DATE
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    // LINK FOR CREATE CATALOG PAGE
    const dateCode = `${currentYear}-${toDoubleDigit(
      currentMonth
    )}-${toDoubleDigit(currentDate.getDate())}`;
    // EXIST VALUE : NEW / NOT EXIST VALUE : CURRENT
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
    // FIND CATALOG GROUP BY DATE(MONTH)
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
    // CATALOG MANUFACTURING
    catalog.forEach((el) => {
      el._id.date = dateToString(el._id.date);
      el.total = numberWithCommas(el.total);
      el.catalog.forEach((e) => {
        e.amount = numberWithCommas(e.amount);
      });
    });

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

const weekByWeek = (date) => {
  // NEW OBJECT FOR PUSH ARRAY
  const obj = new Object();
  // NEW ARRAY FOR RETURN
  const arr = [];
  // VARIABLE - FIRST, LAST BY WEEK
  let f, l;
  // FIRST ELEMENT
  obj.f = dateToCode(date);
  l = new Date(date.setDate(date.getDate() + 6));
  obj.l = dateToCode(l);
  arr.push(obj);
  // THE LAST DAY OF CURRENT MONTH
  const ld = new Date(l.getFullYear(), l.getMonth() + 1, 0);
  // THE REST ELEMENT
  while (l.getMonth() <= ld.getMonth()) {
    // RESET OBJECT FOR PUSH ARRAY
    const obj = new Object();
    f = new Date(l.setDate(l.getDate() + 1));
    obj.f = dateToCode(f);
    l = new Date(f.setDate(f.getDate() + 6));
    obj.l = dateToCode(l);
    arr.push(obj);
    // LAST DAY OF WEEK AND LAST DAY OF MONTH IS EQUAL
    if (l.getDate() === ld.getDate()) break;
  }
  return arr;
};

// WEEKLY
export const weekly = async (req, res) => {
  // CURRENT DATE
  const date = new Date();
  try {
    let flDate;
    // THE FIRST DAY OF THE MONTH
    const currentfirstDate = new Date(date.setDate(1));
    if (currentfirstDate.getDay() !== 0) {
      // THE LAST DAY OF THE WEEK
      const prevlastDate = new Date(
        currentfirstDate.setDate(currentfirstDate.getDate() - 1)
      );
      // THE FIRST DAY OF THE WEEK
      const prevfirstDate = new Date(
        prevlastDate.setDate(prevlastDate.getDate() - prevlastDate.getDay())
      );
      // SEPERATE WEEK BY WEEK
      flDate = weekByWeek(prevfirstDate);
    } else {
      flDate = weekByWeek(currentfirstDate);
    }
    // FIND WITHIN FLDATE RANGE CATALOG SORT BY DATE ASC
    const catalog = await Catalog.find({
      date: { $gte: flDate[0].f, $lte: flDate[flDate.length - 1].l },
    }).sort({ date: 1 });
    // CHANGE DATECODE AND CUT BY WEEK CATALOG
    const aa = [];
    flDate.forEach((e) => {
      const arr = [];
      catalog.forEach((el) => {
        if (el.date >= e.f && el.date <= e.l) {
          arr.push(el);
        }
      });
      e.f = weeklyDateToCode(e.f);
      e.l = weeklyDateToCode(e.l);
      aa.push(arr);
    });
    // SUM OF INCOME AND SPEND
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
