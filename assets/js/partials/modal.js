import { getStrDate } from "../api/getStrDate";

const dayModal = document.getElementById("jsDayModal");
const date = document.getElementById("jsDate");
const prevBtn = document.getElementById("jsPrev");
const nextBtn = document.getElementById("jsNext");
const addBtn = document.getElementById("jsAddBtn");
const closeBtn = document.getElementById("jsCloseBtn");

export const showDetail = async (infoDate) => {
  const res = await getStrDate(infoDate);
  dayModal.style.display = "flex";
  date.id = res.id;
  date.value = res.str;
};

if (dayModal) {
  prevBtn.addEventListener("click", () => {
    const currentDate = new Date(date.id);
    const yesterday = new Date(currentDate.setDate(currentDate.getDate() - 1));
    showDetail(yesterday);
  });

  nextBtn.addEventListener("click", () => {
    const currentDate = new Date(date.id);
    const tomorrow = new Date(currentDate.setDate(currentDate.getDate() + 1));
    showDetail(tomorrow);
  });

  addBtn.addEventListener("click", () => {
    date.value = date.id;
  });

  closeBtn.addEventListener("click", () => {
    dayModal.style.display = "none";
  });
}
