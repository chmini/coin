import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { showDetail } from "./partials/modal";

const calendarEl = document.getElementById("jsCalendar");

// Create Calendar
const calendar = new Calendar(calendarEl, {
  // 5 plugins
  plugins: [interactionPlugin, dayGridPlugin],
  // View Setting
  views: {
    dayGrid: {
      titleFormat: { month: "long" },
    },
  },
  displayEventTime: false,
  dateClick: (info) => {
    //if (calendar.view.type === "dayGridMonth") showDetail(info.date);
  },
});

if (calendarEl) {
  // render calendar
  calendar.render();
}

export default calendar;
