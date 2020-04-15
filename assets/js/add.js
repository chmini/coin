const addContainer = document.getElementById("AddContainer");
const incExp = document.getElementById("IncomeExpend");
const groupBtn = document.getElementById("GroupButton");
const groupContainer = document.getElementById("GroupContainer");
const strGroup = document.getElementById("StrGroup");
const selectedGroup = document.getElementById("SelectedGroup");

const init = () => {
  const radios = incExp.querySelectorAll("input");
  radios.forEach((radio) => {
    radio.addEventListener("click", (e) => {
      const currentValue = e.target.id;
      const selected = document.getElementById(`Group${currentValue}`);
      groupContainer.childNodes.forEach((incexp) => {
        incexp.classList.remove("show");
      });
      selected.classList.add("show");
      selected.childNodes.forEach((group) => {
        group.addEventListener("click", (e) => {
          strGroup.innerText = e.target.innerText;
          selectedGroup.value = e.target.value;
        });
      });
    });
  });

  groupBtn.addEventListener("click", () => {
    groupContainer.classList.toggle("show");
  });
};

if (addContainer) init();
