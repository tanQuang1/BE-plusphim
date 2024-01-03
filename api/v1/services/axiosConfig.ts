import axios from "axios";

const api = axios.create({
  baseURL: "",
  timeout: 1000 * 10,
  headers: {
    "Content-Type": "application/json",
  },
  
});

api.interceptors.request.use(
  (config) => {
    //process config before sending
    return config;
  },
  (error) => {
    //handing request related errors
    console.log(error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    // console.log(error);
    return error.data;
  }
);
export default api;
