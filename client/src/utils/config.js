const backendUrl = "http://localhost:8080";
const token = localStorage.getItem("token");
const headers = {
  token: token,
};
export { backendUrl, headers };
