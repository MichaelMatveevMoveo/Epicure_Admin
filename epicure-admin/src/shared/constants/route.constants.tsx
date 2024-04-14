export const appRoutes = {
  homePage: "/",
  login: "/login",
  signUp: "/signUp",
  databases: "/database",
};

export function withBase(url: string) {
  return `${import.meta.env.VITE_BASE_URL}${url}`;
}
