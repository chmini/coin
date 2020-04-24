export const getCatalog = async () => {
  let result;
  await fetch("/api/catalog", {
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
