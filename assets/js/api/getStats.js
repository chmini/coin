export const getStats = async () => {
  let result;
  await fetch(`/api/stats`, {
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
