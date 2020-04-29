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
        const assets = await Assets.find({ moneyform });
        await Assets.findOneAndUpdate(
          { moneyform },
          {
            total:
              type === "income"
                ? assets[0].total + Number(amount)
                : assets[0].total - Number(amount),
          }
        );
      }

      // spendStats
      const spendStats = await SpendStats.find({ moneyform });
      console.log(spendStats);
      await SpendStats.findOneAndUpdate(
        { moneyform },
        {
          total:
            type === "spend"
              ? spendStats[0].total + Number(amount)
              : spendStats[0].total,
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
    body: { date, type, moneyform, category, subCategory, amount, content },
  } = req;
  try {
    const prevCatalog = await Catalog.findById(id);
    await Catalog.findByIdAndUpdate(
      { _id: id },
      { date, type, moneyform, category, subCategory, amount, content }
    );

    const assets = await Assets.find({ moneyform });
    const spendStats = await SpendStats.find({ moneyform });
    if (prevCatalog.type === "income" && type === "spend") {
      await Assets.findOneAndUpdate(
        { moneyform },
        {
          total: assets[0].total - Number(prevCatalog.amount) - Number(amount),
        }
      );
      await SpendStats.findOneAndUpdate(
        { moneyform },
        {
          total: spendStats[0].total + Number(amount),
        }
      );
    } else if (prevCatalog.type === "spend" && type === "income") {
      await Assets.findOneAndUpdate(
        { moneyform },
        {
          total: assets[0].total + Number(prevCatalog.amount) + Number(amount),
        }
      );
      await SpendStats.findOneAndUpdate(
        { moneyform },
        {
          total: spendStats[0].total - Number(amount),
        }
      );
    } else {
      if (type === "income") {
        // income
        await Assets.findOneAndUpdate(
          { moneyform },
          {
            total:
              assets[0].total - Number(prevCatalog.amount) + Number(amount),
          }
        );
      } else {
        // spend
        if (moneyform !== "카드") {
          await Assets.findOneAndUpdate(
            { moneyform },
            {
              total:
                assets[0].total + Number(prevCatalog.amount) - Number(amount),
            }
          );
        }
        await SpendStats.findOneAndUpdate(
          { moneyform },
          {
            total:
              spendStats[0].total - Number(prevCatalog.amount) + Number(amount),
          }
        );
      }
    }
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
      // assets
      const assets = await Assets.find({ moneyform });

      await Assets.findOneAndUpdate(
        { moneyform },
        {
          total:
            type === "income"
              ? assets[0].total - Number(amount)
              : assets[0].total + Number(amount),
        }
      );
    }

    // spendStats
    const spendStats = await SpendStats.find({ moneyform });
    await SpendStats.findOneAndUpdate(
      { moneyform },
      {
        total:
          type === "spend"
            ? spendStats[0].total - Number(amount)
            : spendStats[0].total,
      }
    );
  } catch (error) {
    console.log(error);
  }
  res.redirect(`${routes.moneybook}${routes.calendar}`);
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

export const daily = (req, res) => {
  res.render("daily");
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
