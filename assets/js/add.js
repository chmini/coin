const addContainer = document.getElementById("AddContainer");
const inout = document.getElementById("Inout");
const categoryBtn = document.getElementById("CategoryButton");
const categoryContainer = document.getElementById("CategoryContainer");
const strCategory = document.getElementById("StrCategory");
const selectedCategory = document.getElementById("SelectedCategory");

const init = () => {
  const cat = document.querySelector(".grid");
  cat.childNodes.forEach((c) => {
    c.addEventListener("click", (e) => {
      strCategory.innerText = e.target.innerText;
      selectedCategory.value = e.target.value;
    });
  });

  const radios = inout.querySelectorAll("input");
  radios.forEach((radio) => {
    radio.addEventListener("click", (e) => {
      const currentValue = e.target.id;
      const selected = document.getElementById(`Category${currentValue}`);
      const categories = categoryContainer.childNodes[0].childNodes;
      categories.forEach((inout) => {
        inout.classList.remove("grid");
      });
      selected.classList.add("grid");
      selected.childNodes.forEach((category) => {
        category.addEventListener("click", (e) => {
          strCategory.innerText = e.target.innerText;
          selectedCategory.value = e.target.value;
        });
      });
    });
  });

  categoryBtn.addEventListener("click", () => {
    categoryContainer.classList.toggle("flex");
  });
};

if (addContainer) init();
