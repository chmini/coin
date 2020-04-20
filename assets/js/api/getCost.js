export const getCost = async () => {
  let result;
  await fetch("/api/data-inout", {
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
