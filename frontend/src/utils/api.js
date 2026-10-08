import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3005/api/v1",
  headers: { "Content-Type": "application/json" },
});

// Send the login token with every request
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// An expired or invalid token means the user has to sign in again
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem("token")) {
      localStorage.removeItem("token");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

// Readable message from a failed request, for alerts
export const errorMessage = (error) =>
  error.response?.data?.message || "Something went wrong, please try again";

const api = {
  signup(data) {
    return client.post("/user", data);
  },
  signin(data) {
    return client.post("/user/login", data);
  },
  getUserProfile() {
    return client.get("/user/profile");
  },
  getPlacesbyKeyword(keyword, radius) {
    return client.get("/trip/google-map-places", {
      params: { keyword, radius },
    });
  },
  getNearbyPlaces(keyword, radius, latitude, longitude) {
    return client.get("/trip/nearby-places", {
      params: { keyword, radius, latitude, longitude },
    });
  },
  getPlaceDetail(place_id) {
    return client.get("/trip/place-detail", { params: { place_id } });
  },
  createTrip(data) {
    return client.post("/trip", data);
  },
  getTripbyUserId() {
    return client.get("/trip");
  },
  getTripbyId(trip_id) {
    return client.get(`/trip/${trip_id}`);
  },
  updateTripbyId(data, trip_id) {
    return client.put(`/trip/${trip_id}`, data);
  },
};

export default api;
