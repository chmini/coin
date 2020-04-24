import routes from "../routes";
import category from "../category";
import Catalog from "../models/Catalog";
import Assets from "../models/Assets";

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
    body: { date, type, moneyform, category, amount, content },
  } = req;
  try {
    await Catalog.create({
      date,
      type,
      moneyform,
      category,
      amount,
      content,
    });
    /*
    const totalAsset = await TotalAsset.find({ asset });
    await TotalAsset.findOneAndUpdate(
      { asset },
      {
        amount:
          inout === "in"
            ? totalAsset[0].amount + Number(amount)
            : totalAsset[0].amount - Number(amount),
      }
    );
    */
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
    body: { date, inout, asset, category, amount, content },
  } = req;
  try {
    const prevInout = await Inout.findById(id);
    await Inout.findByIdAndUpdate(
      { _id: id },
      { date, inout, asset, category, amount, content }
    );

    const totalAsset = await TotalAsset.find({ asset });
    if (prevInout.inout === "in" && inout === "out") {
      await TotalAsset.findOneAndUpdate(
        { asset },
        {
          amount:
            totalAsset[0].amount - Number(prevInout.amount) - Number(amount),
        }
      );
    } else if (prevInout.inout === "out" && inout === "in") {
      await TotalAsset.findOneAndUpdate(
        { asset },
        {
          amount:
            totalAsset[0].amount + Number(prevInout.amount) + Number(amount),
        }
      );
    } else {
      if (inout === "in") {
        // in
        await TotalAsset.findOneAndUpdate(
          { asset },
          {
            amount:
              totalAsset[0].amount - Number(prevInout.amount) + Number(amount),
          }
        );
      } else {
        // out
        await TotalAsset.findOneAndUpdate(
          { asset },
          {
            amount:
              totalAsset[0].amount + Number(prevInout.amount) - Number(amount),
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
    const prevDelInout = await Inout.findById(id);
    const { asset, amount, inout } = prevDelInout;
    console.log(asset, amount, inout);

    await Inout.findByIdAndRemove({ _id: id });

    const totalAsset = await TotalAsset.find({ asset });
    await TotalAsset.findOneAndUpdate(
      { asset },
      {
        amount:
          inout === "in"
            ? totalAsset[0].amount - Number(amount)
            : totalAsset[0].amount + Number(amount),
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
      if (asset.moneyform !== "카드") sum += asset.total;
    });
    res.render("assets", { assets, sum });
  } catch (error) {
    console.log(error);
  }
};

export const firstAssets = async (req, res) => {
  const {
    body: { moneyform, total },
  } = req;
  console.log(moneyform, total);

  await moneyform.forEach(async (moneyform, index) => {
    await Assets.create({
      moneyform,
      total: total[index],
    });
  });
  res.redirect(`${routes.moneybook}${routes.assets}`);
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
