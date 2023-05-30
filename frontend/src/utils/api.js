const api = {
  hostname: "http://localhost:3005",
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
    return axios
      .post(
        `${this.hostname}/user/login`,
        {
          Headers: {
            "Content-Type": "application/json",
          },
        },
        data
      )
      .then((res) => res.json());
  },
};
