import calendar from "../calendar";
import { CreateandPaintCostinCal } from "../costCal";
import { CreateCostinDay } from "../costDay";
import { getStrDate } from "../api/getStrDate";

const calEl = document.getElementById("jsCalendar");
const clsAccountEl = document.getElementById("jsClsAccount");

const btnGroup = document.getElementById("jsBtnGroup");
const dailyBtn = document.getElementById("jsDailyBtn");
const calBtn = document.getElementById("jsCalBtn");
const weeklyBtn = document.getElementById("jsWeeklyBtn");
const monthlyBtn = document.getElementById("jsMonthlyBtn");

const form = document.getElementById("jsForm");
const addBtn = document.getElementById("jsAddBtn_Day");

// Calendar Part show / Account Part hide
const showCal = () => {
  calEl.style.display = "block";
  clsAccountEl.style.display = "none";
};

// Calendar Part hide / Account Part show
const showAcc = () => {
  calEl.style.display = "none";
  clsAccountEl.style.display = "block";
};

// Button Style
const activeBtn = (e) => {
  btnGroup.childNodes.forEach((btn) => {
    if (btn.classList.contains("active")) btn.classList.remove("active");
  });
  e.target.classList.add("active");
};

const init = async () => {
  await CreateandPaintCostinCal();
  const dayEvents = (await CreateCostinDay()).events;
  const dayPaints = (await CreateCostinDay()).paints;

  // For Reload Speed Up
  const eventSources = calendar.getEventSources()[0];

  // Paint Day Events
  const handleDocument = async () => {
    const strDate = await getStrDate(calendar.getDate());
    const titles = document.querySelectorAll(".fc-title");

    const filteredDay = dayPaints.filter((day) => {
      return strDate.id === day.id;
    });

    titles.forEach((title, index) => {
      title.classList.add("title");
      filteredDay[index].span.forEach((span) => {
        title.appendChild(span);
      });
    });

    addBtn.addEventListener("click", () => {
      form.querySelector("input").value = strDate.id;
      form.submit();
    });
  };

  dailyBtn.addEventListener("click", (e) => {
    calendar.changeView("dayGridDay");
    activeBtn(e);
    showCal();
    // Remove calEvents
    const events = calendar.getEvents();
    events.forEach((event) => {
      event.remove();
    });
    // Add dayEvents
    calendar.addEventSource({
      events: dayEvents,
      color: "rgba(0, 0, 0, 0)",
    });
    // Paint Day Events
    document.addEventListener("click", handleDocument);

    addBtn.style.display = "block";
  });

  calBtn.addEventListener("click", (e) => {
    document.removeEventListener("click", handleDocument);
    calendar.changeView("dayGridMonth");
    activeBtn(e);
    showCal();
    // Remove dayEvents
    const events = calendar.getEvents();
    events.forEach((event) => {
      event.remove();
    });
    // Restore calEvents
    eventSources.refetch();

    addBtn.style.display = "none";
  });

  weeklyBtn.addEventListener("click", (e) => {
    showAcc();
    activeBtn(e);
    addBtn.style.display = "none";
  });

  monthlyBtn.addEventListener("click", (e) => {
    showAcc();
    activeBtn(e);
    addBtn.style.display = "none";
  });
};

if (calEl) {
  init();
}
