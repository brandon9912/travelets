import axios from "axios";

const api = {
  hostname: "http://localhost:3005/api/v1",
  signup(data) {
    return axios
      .post(
        `${this.hostname}/user/register`,
        {
          Headers: {
            "Content-Type": "application/json",
          },
        },
        data
      )
      .then((res) => res.json());
  },
  signin(data) {
    return axios.post(`${this.hostname}/user/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

export default api;
