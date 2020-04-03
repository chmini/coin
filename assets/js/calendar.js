import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

const calendarEl = document.getElementById("jsCalendar");

const init = () => {
  // Create Calendar
  const calendar = new Calendar(calendarEl, {
    // 5 plugins
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      interactionPlugin,
      timeGridPlugin,
      listPlugin
    ],
    selectable: true,
    // buttons
    header: { center: "dayGridMonth,dayGridWeek,dayGridDay,listWeek" },
    buttonText: {
      month: "달력",
      week: "주별",
      day: "일별",
      list: "메모장"
    },
    // View Setting
    views: {
      dayGrid: {
        titleFormat: { month: "long" }
      },
      list: {
        titleFormat: { month: "long" }
      }
    },
    // Date Click Event
    dateClick: info => {
      //viewDetail(info.date);
    }
  });
  // render calendar
  calendar.render();
};

if (calendarEl) {
  init();
}
