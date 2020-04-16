export const getCost = async () => {
  let result;
  await fetch("/api/data", {
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
