import { getData } from "./api/getData";

export const CreateCostinDay = async () => {
  // Get Data from DB
  const items = await getData();

  // Extract Dates from items
  const dates = [];
  items.forEach((item) => {
    dates.push(item.date);
  });

  // Filter Overlapped Dates
  const filteredDates = dates.filter((item, index, self) => {
    return self.indexOf(item) === index;
  });

  // Categorized by Date
  const data = [];
  filteredDates.forEach((date, index) => {
    data.push([]);
    items.forEach((item) => {
      if (date === item.date) {
        data[index].push(item);
      }
    });
  });

  // Create Events Object
  const events = [];
  const paints = [];
  data.forEach((item, index) => {
    // Initialized for Get Sum
    let inc = 0;
    let exp = 0;

    // Get Sum and Set TextColor
    const last = data[index].length;
    data[index].forEach((item, index) => {
      let incExp;
      if (item.incExp === "income") {
        inc += item.amount;
        incExp = "#2980b9";
      } else {
        exp += item.amount;
        incExp = "#c0392b";
      }

      // Income and Expend
      events.push({
        start: `${item.date}T00:${index < 10 ? `0${index}` : `${index}`}:00`,
        textColor: incExp,
      });

      // For Paint
      const span = [];
      for (let i = 0; i < 3; i++) {
        span[i] = document.createElement("span");
      }
      span[0].innerText = item.type;
      span[1].innerText = item.group;
      span[2].innerText = item.amount;
      paints.push({ id: item.date, span });
    });
  });

  return { events, paints };
};
