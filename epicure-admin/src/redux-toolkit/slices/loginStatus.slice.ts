import { createSlice } from "@reduxjs/toolkit";

import { getTokenFromCookies } from "../../data/utils/MyLink.util/cookies";

interface loginStatusState {
  isLogin: boolean;
}

const initialState: loginStatusState = {
  isLogin: getTokenFromCookies() ? true : false,
};
const loginStatusSlice = createSlice({
  name: "loginStatus",
  initialState,
  reducers: {
    setIsLogin(state, actions) {
      state.isLogin = actions.payload;
    },
  },
});

export const { setIsLogin } = loginStatusSlice.actions;
export default loginStatusSlice.reducer;
