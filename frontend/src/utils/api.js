import axios from "axios";

const api = {
  hostname: "http://localhost:3005/api/v1",
  signup(data) {
    return axios.post(`${this.hostname}/user`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  signin(data) {
    return axios.post(`${this.hostname}/user/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getUserProfile() {
    return axios.get(`${this.hostname}/user/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  getPlacesbyKeyword(keyword, radius) {
    return axios.get(`${this.hostname}/trip/google-map-places`, {
      params: {
        keyword: keyword,
        radius: radius,
      },
    });
  },
  getNearbyPlaces(keyword, radius, latitude, longitude) {
    return axios.get(`${this.hostname}/trip/nearby-places`, {
      params: {
        keyword: keyword,
        radius: radius,
        latitude: latitude,
        longitude: longitude,
      },
    });
  },
  getPlaceDetail(place_id) {
    return axios.get(`${this.hostname}/trip/place-detail`, {
      params: {
        place_id: place_id,
      },
    });
  },
  createTrip(data) {
    return axios.post(`${this.hostname}/trip`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  getTripbyUserId() {
    return axios.get(`${this.hostname}/trip`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  getTripbyId(trip_id) {
    return axios.get(`${this.hostname}/trip/${trip_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  updateTripbyId(data, trip_id) {
    return axios.put(`${this.hostname}/trip/${trip_id}`, data, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow CORS
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
};

export default api;
