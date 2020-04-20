import { createElement } from "@fullcalendar/core";

const modal = document.getElementById("Modal");
const date = document.getElementById("Date");
const total = document.getElementById("Total");
const information = document.getElementById("Information");
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
  while (information.firstElementChild)
    information.removeChild(information.firstElementChild);
};

const removeTotal = async () => {
  while (total.firstElementChild) total.removeChild(total.firstElementChild);
};

export const showModal = async (info) => {
  // show modal
  modal.classList.add("flex");

  let result;
  await fetch(`/api/data-inout?date=${info.dateStr}`, {
    method: "post",
  })
    .then((response) => {
      return response.json();
    })
    .then(async (json) => {
      result = json;
    });
  // paint date
  const dateObj = createDateObj(info.date);
  date.querySelector("span").innerText = dateObj.content;
  date.querySelector("input").value = dateObj.id;
  // paint data
  let inc = 0;
  let exp = 0;
  await removeInfo();
  await removeTotal();
  result.forEach((item) => {
    const link = createElement("a", { href: item._id });
    const columnEl = createElement("div", { className: "modal__column-el" });
    const category = createElement(
      "span",
      { className: "group" },
      item.category
    );
    const asset = createElement("span", { className: "asset" }, item.asset);
    const amount = createElement(
      "span",
      { className: `${item.inout}` },
      `${item.amount}`
    );
    columnEl.appendChild(category);
    columnEl.appendChild(asset);
    columnEl.appendChild(amount);
    link.appendChild(columnEl);
    information.appendChild(link);
    // total item
    if (item.incExp === "income") inc = inc + item.amount;
    else exp = exp + item.amount;
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
    modal.classList.remove("flex");
  });

  moveBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const currentDate = new Date(date.querySelector("input").value);
      let changedDate;
      if (btn.classList.contains("prev"))
        changedDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
      else
        changedDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
      const info = {
        date: changedDate,
        dateStr: createDateObj(changedDate).id,
      };
      showModal(info);
    });
  });
}
