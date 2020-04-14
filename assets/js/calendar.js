import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { showModal } from "./partials/modal";

const calendarEl = document.getElementById("Calendar");

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
    if (calendar.view.type === "dayGridMonth") showModal(info.date);
  },
});

if (calendarEl) {
  // render calendar
  calendar.render();
}

export default calendar;
