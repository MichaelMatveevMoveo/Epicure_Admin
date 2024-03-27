import {
  BACKEND_PORT,
  BACKEND_URL,
  BACKEND_V,
  SERVER_API_PUBLIC_KEY,
} from "../../shared/constants/backEnd.constants";
import forge from "node-forge";
import axios from "./appAxios";

const encryptData = (password: string) => {
  const publicKey = forge.pki.publicKeyFromPem(SERVER_API_PUBLIC_KEY);
  const encryptedPassword = forge.util.encode64(publicKey.encrypt(password));
  return encryptedPassword;
};

export const login = async (username: string, password: string) => {
  const encryptedPassword = encryptData(password);

  try {
    const response = await axios.post(
      `${BACKEND_URL}:${BACKEND_PORT}${BACKEND_V}/users/login`,
      {
        username,
        password: encryptedPassword,
      },
      {
        withCredentials: true, // Include this line for credentials
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return true;
    } else {
      return false;
      // Handle login failure
    }
  } catch (error) {
    return false;
    // Handle error
  }
};
