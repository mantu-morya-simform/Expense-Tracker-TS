const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const data = JSON.parse(localStorage.getItem("transactions") || "[]");

const selectedData = data.filter((item) => item.id === id);

console.log(selectedData);
