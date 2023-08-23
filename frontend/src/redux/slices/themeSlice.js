import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDark: true,
  },
  reducers: {
    setTheme(state, action) {
      state.isDark = !state.isDark;
      if (state.isDark) {
        document.querySelector("body").setAttribute("data-bs-theme", "dark");
      } else {
        document.querySelector("body").setAttribute("data-bs-theme", "light");
      }
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
