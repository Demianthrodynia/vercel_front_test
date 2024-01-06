import { createSlice } from "@reduxjs/toolkit";

export const editSlice = createSlice({
  name: "edit",
  initialState: {
    data: {},
  },
  reducers: {
    toedit: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    edited: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});
export const { toedit, edited } = editSlice.actions;
export const editData = (state) => state.edit;
export default editSlice.reducer;
