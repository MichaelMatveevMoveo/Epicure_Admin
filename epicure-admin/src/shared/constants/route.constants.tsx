export const appRoutes = {
  homePage: "/",
  login: "/login",
  databases: "/database",
};

export function withBase(url: string) {
  return `${import.meta.env.VITE_BASE_URL}${url}`;
}
