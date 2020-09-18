import axios from "axios";
import store from "../store";

const BASE_API_URL = "http://localhost:8000/api/";

// Use this for requests that require the user to be logged in.
// This axios instance will check every request if the
// access token is expired and request a new one if nesseary
// Also it adds the access token to every request
const authRequest = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  },
});

// Before each request add the accessToken
authRequest.interceptors.request.use((config) => {
  const token =
    store.state.auth.accessToken != null ? store.state.auth.accessToken : " ";
  config.headers.Authorization = "Bearer " + token;
  return config;
});

// // We only need to react if there is an error
// authRequest.interceptors.response.use(undefined, (error) => {
//   console.log("Caught an error in a request");
//   console.log("status code", error.respone);
//   // const originalRequest = error.config;

//   // if the error repsonse status is 401 the token was invalid
//   // so we refresh the token with the refresh token
//   if (error.config && error.respone && error.respone.status === 401) {
//     console.log("found a 401");
//     store
//       .dispatch("auth/refreshToken") // Try to refresh the token
//       .then((token) => {
//         console.log("new token", token);
//       })
//       .catch((err) => {
//         // Handle the distach error
//         console.error(err);
//       });
//   }

//   return error;
// });

// Use this for simple axios requests
// This axios instance does not check for every request if the
// access token is expired
const apiRequest = axios.create({
  baseURL: BASE_API_URL,
  headers: { "Content-Type": "application/json" },
});

export { authRequest, apiRequest };
