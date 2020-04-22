const addContainer = document.getElementById("AddContainer");
const inout = document.getElementById("Inout");
const categoryBtn = document.getElementById("CategoryButton");
const categoryContainer = document.getElementById("CategoryContainer");
const strCategory = document.getElementById("StrCategory");
const selectedCategory = document.getElementById("SelectedCategory");

const changeCategory = () => {
  const categories = categoryContainer.childNodes[0].childNodes;
  categories.forEach((inout) => {
    inout.classList.remove("grid");
  });
};

const addEventCategory = (obj) => {
  obj.childNodes.forEach((category) => {
    category.addEventListener("click", (e) => {
      strCategory.innerText = e.target.innerText;
      selectedCategory.value = e.target.value;
    });
  });
};

const init = () => {
  const cat = document.querySelector(".grid");
  cat.childNodes.forEach((c) => {
    c.addEventListener("click", (e) => {
      strCategory.innerText = e.target.innerText;
      selectedCategory.value = e.target.value;
    });
  });

  const card = document.getElementById("Card");
  const out = document.getElementById("Out");
  card.addEventListener("click", (e) => {
    changeCategory();
    const categoryOut = document.getElementById("CategoryOut");
    categoryOut.classList.add("grid");
    out.checked = true;
    addEventCategory(categoryOut);
  });

  const radios = inout.querySelectorAll("input");
  radios.forEach((radio) => {
    radio.addEventListener("click", (e) => {
      const currentValue = e.target.id;
      changeCategory();
      const selected = document.getElementById(`Category${currentValue}`);
      selected.classList.add("grid");
      addEventCategory(selected);
    });
  });

  categoryBtn.addEventListener("click", () => {
    categoryContainer.classList.toggle("flex");
  });
};

if (addContainer) init();
