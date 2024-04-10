import jwt_decode from "jwt-webtoken";

export const isLoggedIn = () => {
  const token = localStorage.getItem("token"); // Retrieve the token from local storage

  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
      return decodedToken.exp > currentTime; // Compare the token's expiration time with the current time
    } catch (error) {
      console.log("Error decoding token:", error);
      return false;
    }
  }

  return false;
};
