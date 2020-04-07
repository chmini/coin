export const getStrDate = async (date) => {
  let result;
  await fetch(`/api/strDate?date=${date}`, {
    method: "get",
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      result = json;
    });
  return result;
};
