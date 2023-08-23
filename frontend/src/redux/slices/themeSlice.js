import { createSlice } from "@reduxjs/toolkit";
import {
  setDarkMode,
  setLightMode,
  toggleTheme,
} from "../../utils/ThemeContext";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDark: true,
  },
  reducers: {
    setTheme(state, action) {
      state.isDark = !state.isDark;
      toggleTheme(action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
