export const getCatalogbyDate = async (date) => {
  let result;
  await fetch(`/api/catalog?date=${date}`, {
    method: "post",
  })
    .then((response) => {
      return response.json();
    })
    .then(async (json) => {
      result = json;
    });
  return result;
};
