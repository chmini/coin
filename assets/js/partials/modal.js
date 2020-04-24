import { createElement } from "@fullcalendar/core";
import { getCatalogbyDate } from "../api/getCatalogbyDate";

const modal = document.getElementById("Modal");
const btnClose = document.getElementById("CloseBtn");
const dateString = document.getElementById("DateString");
const dateCode = document.getElementById("DateCode");
const btnChangeDate = document.querySelectorAll(".changeDate");

const info = document.getElementById("Info");
const diff = document.getElementById("Diff");

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

const removeModalContent = async () => {
  while (info.firstElementChild) info.removeChild(info.firstElementChild);
  while (diff.firstElementChild) diff.removeChild(diff.firstElementChild);
};

export const showModal = async (obj) => {
  // show modal
  modal.classList.add("flex");

  // paint date
  const dateObj = createDateObj(obj.date);
  dateString.innerText = dateObj.content;
  dateCode.value = obj.dateStr;

  // clear modal
  await removeModalContent();

  // get catalog by date
  const catalogs = await getCatalogbyDate(obj.dateStr);

  // paint catalog in modal
  let income = 0,
    spend = 0;
  catalogs.forEach((item) => {
    const link = createElement("a", { href: item._id });
    const columnEl = createElement("div", { className: "column__info" });
    const category = createElement(
      "span",
      { className: "category" },
      item.category
    );
    const moneyform = createElement(
      "span",
      { className: "moneyform" },
      item.moneyform
    );
    const amount = createElement(
      "span",
      { className: `${item.type}` },
      `${item.amount}`
    );
    const content = createElement(
      "span",
      { className: "content" },
      item.content
    );
    columnEl.appendChild(category);
    content.appendChild(moneyform);
    columnEl.appendChild(content);
    columnEl.appendChild(amount);
    link.appendChild(columnEl);
    info.appendChild(link);

    // diff
    if (item.type === "income") income = income + item.amount;
    else spend = spend + item.amount;
  });
  const inc = createElement("span", { className: "income" }, `${income}`);
  const sp = createElement("span", { className: "spend" }, `${spend}`);
  if (income !== 0 || spend !== 0) {
    diff.appendChild(inc);
    diff.appendChild(sp);
  }
};

if (modal) {
  btnClose.addEventListener("click", () => {
    modal.classList.remove("flex");
  });

  btnChangeDate.forEach((btn) => {
    btn.addEventListener("click", () => {
      const currentDate = new Date(dateCode.value);

      let changedDate;
      if (btn.classList.contains("prev"))
        changedDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
      else
        changedDate = new Date(currentDate.setDate(currentDate.getDate() + 1));

      const obj = {
        date: changedDate,
        dateStr: createDateObj(changedDate).id,
      };

      showModal(obj);
    });
  });
}
