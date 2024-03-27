import axios from "axios";

import {
  BACKEND_PORT,
  BACKEND_URL,
  BACKEND_V,
} from "../../shared/constants/backEnd.constants";
import {
  getTokenFromCookies,
  removeTokenFromCookies,
} from "../../data/utils/MyLink.util/cookies";
import { setIsLogin } from "../../redux-toolkit/slices/loginStatus.slice";

const handleLoginState = () => {
  // Dispatch the action to update login state
  setIsLogin(false); // Example action
  // Optionally, you can redirect the user to the login page here
  window.location.href = "/login";
};

axios.interceptors.request.use(
  (config) => {
    if (!config.url) {
      return config;
    }

    if (
      !(
        config.method !== "get" &&
        config.url.includes(`${BACKEND_URL}:${BACKEND_PORT}${BACKEND_V}`) &&
        !config.url.includes("/login")
      )
    ) {
      return config;
    }

    const token = getTokenFromCookies();
    if (!token) {
      console.log("po");
      handleLoginState();
      return config;
    }

    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    if (response.status == 401) {
      removeTokenFromCookies();
      handleLoginState();
    }
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status == 401) {
        removeTokenFromCookies();
        handleLoginState();
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
