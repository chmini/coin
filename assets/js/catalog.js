import { createElement } from "@fullcalendar/core";
import { getCategory } from "./api/getCategory";

const catalogEl = document.getElementById("Catalog");
const categoryObj = document.getElementById("CategoryObj");
const categoryEl = document.getElementById("Category");
const subCategoryEl = document.getElementById("SubCategory");

const type = document.getElementById("Type");

const removeCategory = (value) => {
  const category = categoryEl.childNodes[0].childNodes;
  category.forEach((cat) => {
    cat.classList.remove("grid");
  });
  subCategoryEl.classList.remove("flex");
};

const paintCategory = async (e) => {
  //
  const category = await getCategory();
  const con = e.target.classList;
  const cat = category[con[0]][con[1]];

  // paint category
  const catString = document.getElementById("CategoryString");
  const catCode = document.getElementById("CategoryCode");
  const subCatString = document.getElementById("SubCategoryString");
  const subCatCode = document.getElementById("SubCategoryCode");
  catString.innerText = e.target.innerText;
  catCode.value = e.target.innerText;
  subCatString.innerText = "";
  subCatCode.value = "";

  const subCat = document.getElementById("SubCategorySpend");
  while (subCat.firstElementChild) subCat.removeChild(subCat.firstElementChild);

  if (cat.c) {
    subCategoryEl.classList.add("flex");
    subCat.classList.add("grid");
    for (const key in cat.c) {
      const span = createElement("span", { className: key }, cat.c[key]);
      span.addEventListener("click", (e) => {
        //cat.p
        subCatString.innerText = `/${e.target.innerText}`;
        subCatCode.value = e.target.innerText;
      });
      subCat.appendChild(span);
    }
  } else {
    subCategoryEl.classList.remove("flex");
  }
};

const addEvent = (obj) => {
  obj.childNodes.forEach((cat) => {
    cat.addEventListener("click", paintCategory);
  });
};

const init = () => {
  categoryObj.addEventListener("click", () => {
    categoryEl.classList.toggle("flex");
  });

  const defaultCat = document.querySelector(".grid");
  addEvent(defaultCat);

  const radios = type.querySelectorAll(".radio");
  radios.forEach((radio) => {
    radio.addEventListener("click", (e) => {
      // before show
      const currentValue = e.target.id;
      removeCategory(currentValue);
      // show
      const selectCat = document.getElementById(`Category${currentValue}`);
      selectCat.classList.add("grid");

      // add click event in Category
      addEvent(selectCat);
    });
  });
};

if (catalogEl) init();
