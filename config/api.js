import axios from "axios";

export default () => {
  return axios.create({
    json: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Method": "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    }
  });
};
