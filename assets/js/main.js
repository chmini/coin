import "../scss/styles.scss";

import "./calendar";
import "./paint";
import "./catalog";

import "./api/getCatalog";
import "./api/getCatalogbyDate";

import "./partials/modal";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
