export const getCategory = async () => {
  let result;
  await fetch(`/api/category`, {
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
