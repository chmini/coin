import { getCatalog } from "./api/getCatalog";
import calendar from "./calendar";
import { numberWithCommas } from "./main";

const calendarEl = document.getElementById("Calendar");

const paintCal = async () => {
  // GET DATA FROM DB
  const items = await getCatalog();

  // EXTRACT DATES FROM ITEMS
  const dates = [];
  items.forEach((item) => {
    dates.push(item.date);
  });

  // FILTER OVERLAPPED DATES
  const filteredDates = dates.filter((item, index, self) => {
    return self.indexOf(item) === index;
  });

  // CATEGORIZED BY DATE
  const data = [];
  filteredDates.forEach((date, index) => {
    data.push([]);
    items.forEach((item) => {
      if (date === item.date) {
        data[index].push(item);
      }
    });
  });

  // CREATE EVENTS OBJECT
  const events = [];
  data.forEach((item, index) => {
    // INITIALIZED FOR GET SUM
    let income = 0;
    let spend = 0;

    // GET INCOME SUM AND EXPEND SUM BY DATE
    data[index].forEach((d) => {
      if (d.type === "income") income += d.amount;
      else spend += d.amount;
    });

    // INCOME
    events.push({
      start: `${filteredDates[index]}T00:00:00`,
      title: numberWithCommas(income),
      textColor: "#2980b9",
    });

    // EXPEND
    events.push({
      start: `${filteredDates[index]}T01:00:00`,
      title: numberWithCommas(spend),
      textColor: "#c0392b",
    });

    // DIFFERENCE
    events.push({
      start: `${filteredDates[index]}T02:00:00`,
      title: numberWithCommas(income - spend),
      textColor: "#7f8c8d",
    });
  });

  // PAINT COST IN CALENDAR
  calendar.addEventSource({
    events: events,
    color: "rgba(0, 0, 0, 0)",
  });
};

if (calendarEl) paintCal();
