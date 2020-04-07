import calendar from "../calendar";

const event = [];

const getData = async () => {
  await fetch("/api/data", {
    method: "post",
  })
    .then((response) => {
      return response.json();
    })
    .then(async (json) => {
      json.forEach((data) => {
        console.log(data);
        event.push({ title: data.type, start: data.date });
      });
      calendar.addEventSource(event);
    });

  const eventSources = calendar.getEventSources()[0];
  const events = eventSources.internalEventSource.meta;
  //eventsSources.remove();
};

getData();
