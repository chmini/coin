import { getCatalog } from "./api/getCatalog";
import calendar from "./calendar";

const calendarEl = document.getElementById("Calendar");

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const paintCal = async () => {
  // Get Data from DB
  const items = await getCatalog();

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
    let income = 0;
    let spend = 0;

    // Get Income Sum and Expend Sum by Date
    data[index].forEach((d) => {
      if (d.type === "income") income += d.amount;
      else spend += d.amount;
    });

    // Income
    events.push({
      start: `${filteredDates[index]}T00:00:00`,
      title: numberWithCommas(income),
      textColor: "#2980b9",
    });

    // Expend
    events.push({
      start: `${filteredDates[index]}T01:00:00`,
      title: numberWithCommas(spend),
      textColor: "#c0392b",
    });

    // Difference
    events.push({
      start: `${filteredDates[index]}T02:00:00`,
      title: numberWithCommas(income - spend),
      textColor: "#7f8c8d",
    });
  });

  // Paint Cost in Calendar
  calendar.addEventSource({
    events: events,
    color: "rgba(0, 0, 0, 0)",
  });
};

if (calendarEl) paintCal();
