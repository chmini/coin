import { getData } from "../api/getData";
import { createElement } from "@fullcalendar/core";

const modal = document.getElementById("Modal");
const date = document.getElementById("Date");
const total = document.getElementById("Total");
const info = document.getElementById("Information");
const closeBtn = document.getElementById("CloseButton");
const moveBtn = document.querySelectorAll(".moveBtn");

const createDateObj = (date) => {
  const day = ["일", "월", "화", "수", "목", "금", "토"];
  return {
    id: `${date.getFullYear()}-${
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : `${date.getMonth() + 1}`
    }-${date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`}`,
    content: `${date.getMonth() + 1}월 ${date.getDate()}일 ${
      day[date.getDay()]
    }요일`,
  };
};

const removeInfo = async () => {
  while (info.firstElementChild) info.removeChild(info.firstElementChild);
};

const removeTotal = async () => {
  while (total.firstElementChild) total.removeChild(total.firstElementChild);
};

export const showModal = async (d) => {
  // show modal
  modal.classList.add("show");
  // paint date
  const dateObj = createDateObj(d);
  date.querySelector("span").innerText = dateObj.content;
  date.querySelector("input").value = dateObj.id;
  // paint data
  let inc = 0;
  let exp = 0;
  const data = await getData();
  await removeInfo();
  await removeTotal();
  data.forEach((item) => {
    if (item.date === dateObj.id) {
      // all item
      const columnEl = createElement("div", { className: "modal__column-el" });
      const group = createElement("span", { className: "group" }, item.group);
      const type = createElement("span", { className: "type" }, item.type);
      const amount = createElement(
        "span",
        { className: `${item.incExp}` },
        `${item.amount}`
      );
      columnEl.appendChild(group);
      columnEl.appendChild(type);
      columnEl.appendChild(amount);
      info.appendChild(columnEl);
      // total item
      if (item.incExp === "income") inc = inc + item.amount;
      else exp = exp + item.amount;
    }
  });
  const income = createElement("span", { className: "income" }, `${inc}`);
  const expend = createElement("span", { className: "expend" }, `${exp}`);
  if (inc !== 0 || exp !== 0) {
    total.appendChild(income);
    total.appendChild(expend);
  }
};

if (modal) {
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  moveBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const currentDate = new Date(date.querySelector("input").value);
      let changedDate;
      if (btn.classList.contains("prev"))
        changedDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
      else
        changedDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
      showModal(changedDate);
    });
  });
}
