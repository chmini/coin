import Chart from "chart.js";
import { getStats } from "./api/getStats";

const ctx = document.getElementById("myChart");

const color = [
  "rgba(95, 0, 255, 0.2)",
  "rgba(1, 0, 255, 0.2)",
  "rgba(0, 84, 255, 0.2)",
  "rgba(0, 216, 255, 0.2)",
  "rgba(29, 219, 22, 0.2)",
  "rgba(171, 242, 0, 0.2)",
  "rgba(255, 228, 0, 0.2)",
  "rgba(255, 187, 0, 0.2)",
  "rgba(255, 94, 0, 0.2)",
  "rgba(255, 0, 0, 0,2)",
];

const init = async () => {
  const res = await getStats();
  const data = {
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: [],
        backgroundColor: [],
        borderWidth: 1,
      },
    ],
  };

  res.sort((a, b) => {
    return a.total - b.total;
  });

  res.forEach((el, i) => {
    console.log(i);
    data.labels.push(el._id);
    data.datasets[0].data.push(el.total);
    data.datasets[0].backgroundColor.push(color[i]);
  });

  const myChart = new Chart(ctx, {
    type: "pie",
    data: data,
  });
};

if (ctx) {
  init();
}
