import { createElement } from "@fullcalendar/core";
import { getCatalogbyDate } from "../api/getCatalogbyDate";
import { numberWithCommas } from "../main";

// MODAL
const modal = document.getElementById("Modal");
// COLUMN DATE
const dateString = document.querySelector(".js-date__string");
const dateCode = document.querySelector(".js-date__code");
// COLUMN TOTAL
const total = document.querySelector(".js-column__total");
// COLUMN INFO
const info = document.getElementById("Info");
// BUTTONS
const btnClose = document.querySelector(".js-modal__button-close");
const btnPrevDate = document.querySelector(".js-modal__button-prev");
const btnNextDate = document.querySelector(".js-modal__button-next");

// FUNCTIONS
const toDoubleDigit = (num) => {
  return num < 10 ? `0${num}` : num;
};

const createDateObj = (date) => {
  const day = ["일", "월", "화", "수", "목", "금", "토"];
  return {
    code: `${date.getFullYear()}-${toDoubleDigit(
      date.getMonth() + 1
    )}-${toDoubleDigit(date.getDate())}`,
    str: `${date.getMonth() + 1}월 ${date.getDate()}일 ${
      day[date.getDay()]
    }요일`,
  };
};

const removeModalContent = async () => {
  while (info.firstElementChild) info.removeChild(info.firstElementChild);
  while (total.firstElementChild) total.removeChild(total.firstElementChild);
};

export const showModal = async (obj) => {
  // SHOW MODAL
  modal.classList.add("flex");
  // PAINT DATE
  const dateObj = createDateObj(obj.date);
  dateString.innerText = dateObj.str;
  dateCode.value = dateObj.code;
  // CLEAR MODAL
  await removeModalContent();
  // GET CATALOG BY DATE
  const catalogs = await getCatalogbyDate(obj.dateStr);
  // PAINT CATALOG IN MODAL
  let i = 0,
    s = 0;
  catalogs.forEach((item) => {
    const link = createElement("a", { href: item._id });
    const columnInfo = createElement("div", { className: "column__info" });
    const category = createElement(
      "span",
      { className: "category" },
      item.category
    );
    const subCategory = createElement(
      "span",
      { className: "subCategory" },
      item.subCategory
    );
    const moneyform = createElement(
      "span",
      { className: "moneyform" },
      item.moneyform
    );
    const amount = createElement(
      "span",
      { className: `${item.type}` },
      `${numberWithCommas(item.amount)}`
    );
    const content = createElement(
      "span",
      { className: "content" },
      item.content
    );
    // APPEND TO HTML
    // SUBCATAEGORY EXIST WHETHER
    if (item.subCategory) {
      subCategory.appendChild(category);
      columnInfo.appendChild(subCategory);
    } else {
      columnInfo.appendChild(category);
    }
    // CONTENT EXIST WHETHER
    if (item.content) {
      content.appendChild(moneyform);
      columnInfo.appendChild(content);
    } else {
      columnInfo.appendChild(moneyform);
    }
    columnInfo.appendChild(amount);
    link.appendChild(columnInfo);
    info.appendChild(link);
    // TOTAL
    if (item.type === "income") i = i + item.amount;
    else s = s + item.amount;
  });
  const income = createElement(
    "span",
    { className: "income" },
    `${numberWithCommas(i)}`
  );
  const spend = createElement(
    "span",
    { className: "spend" },
    `${numberWithCommas(s)}`
  );
  total.appendChild(income);
  total.appendChild(spend);
};

if (modal) {
  // CLOSE BUTTON EVENT
  btnClose.addEventListener("click", () => {
    modal.classList.remove("flex");
  });
  // PREVIOUS BUTTON EVENT
  btnPrevDate.addEventListener("click", () => {
    const currentDate = new Date(dateCode.value);
    const changedDate = new Date(
      currentDate.setDate(currentDate.getDate() - 1)
    );
    const obj = {
      date: changedDate,
      dateStr: createDateObj(changedDate).code,
    };
    showModal(obj);
  });
  // NEXT BUTTON EVENT
  btnNextDate.addEventListener("click", () => {
    const currentDate = new Date(dateCode.value);
    const changedDate = new Date(
      currentDate.setDate(currentDate.getDate() + 1)
    );
    const obj = {
      date: changedDate,
      dateStr: createDateObj(changedDate).code,
    };
    showModal(obj);
  });
}
