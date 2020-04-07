import calendar from "../calendar";

const calEl = document.getElementById("jsCalendar");
const clsAccountEl = document.getElementById("jsClsAccount");

const btnGroup = document.getElementById("jsBtnGroup");
const dailyBtn = document.getElementById("jsDailyBtn");
const calBtn = document.getElementById("jsCalBtn");
const weeklyBtn = document.getElementById("jsWeeklyBtn");
const monthlyBtn = document.getElementById("jsMonthlyBtn");

const handleCal = () => {
  calEl.style.display = "block";
  clsAccountEl.style.display = "none";
};

const handleAcc = () => {
  calEl.style.display = "none";
  clsAccountEl.style.display = "block";
};

const activeBtn = (e) => {
  btnGroup.childNodes.forEach((btn) => {
    if (btn.classList.contains("active")) btn.classList.remove("active");
  });
  e.target.classList.add("active");
};

if (calEl) {
  dailyBtn.addEventListener("click", (e) => {
    calendar.changeView("dayGridDay");
    handleCal();
    activeBtn(e);
  });

  calBtn.addEventListener("click", (e) => {
    calendar.changeView("dayGridMonth");
    handleCal();
    activeBtn(e);
  });

  weeklyBtn.addEventListener("click", (e) => {
    handleAcc();
    activeBtn(e);
  });

  monthlyBtn.addEventListener("click", (e) => {
    handleAcc();
    activeBtn(e);
  });
}
