import { createSlice } from "@reduxjs/toolkit";

export const characterSlice = createSlice({
  name: "character",
  initialState: {},
  reducers: {
    selectchar: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearchar: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});
export const { selectchar, clearchar } = characterSlice.actions;
export const characterData = (state) => state.character;
export default characterSlice.reducer;
