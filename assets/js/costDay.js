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

      // Difference
      if (index === last - 1) {
        events.push({
          start: `${item.date}T00:${last < 10 ? `0${last}` : `${last}`}:00`,
          textColor: "#7f8c8d",
        });
      }
    });
  });

  return events;
};
