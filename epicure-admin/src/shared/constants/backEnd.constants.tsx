import { collections } from "../../resources/dataBase.resources";

export const BACKEND_URL = "http://localhost";
export const BACKEND_PORT = 3000;
export const BACKEND_V = "/api/v1";

export const options = {
  chefs: { key: "chefs", value: collections.chefs },
  restaurants: { key: "restaurants", value: collections.restaurants },
  dishes: { key: "dishes", value: collections.dishes },
};

export const API_KEY = "133452185731152";
export const CLOUD_NAME = "dw9zgmwld";
export const SERVER_API_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAts9iDOCKYfXR2WQEvTTm
8CGVsMNJPrTS/mCxMv4H/XfX3XB+pqlnZu5tc0AWPG/Ps4x8JPiaBuniGkHXqq30
m5rNKxOfvtOMnQTiHqGPhNS01MKaqSNtNNzolTZ2GcvaVdqsl0o1TCuFs8zSCqtR
c/2Tr1xg6Dvkt0hlk9xUpb4kjhiOQqIh+782yVM23NjZ04slX7hq4TIPohObOums
V4mbips499gWKYU6qB+MgYLTCOtj80W0kqUCp6E6iU46VqNoMg+zIAg77jqHzU2r
5ljBzlECet4z7QDfDeOyMIZ/Jv0hCa69FPFL4ORrFIQd7lLJajGQDt2oD63WTRJS
GQIDAQAB
-----END PUBLIC KEY-----`;
