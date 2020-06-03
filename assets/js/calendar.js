import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { showModal } from "./partials/modal";

const calendarEl = document.getElementById("Calendar");

// CREATE CALENDAR
const calendar = new Calendar(calendarEl, {
  // 5 PLUGINS
  plugins: [interactionPlugin, dayGridPlugin],
  // VIEW SETTING
  views: {
    dayGrid: {
      titleFormat: { month: "long" },
    },
  },
  displayEventTime: false,
  dateClick: (info) => {
    if (calendar.view.type === "dayGridMonth") showModal(info);
  },
});

if (calendarEl) {
  calendar.render();
}

export default calendar;
