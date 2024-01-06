import { createSlice } from "@reduxjs/toolkit";

export const editionSlice = createSlice({
  name: "edition",
  initialState: {
    data: {},
  },
  reducers: {
    addedition: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    removeedition: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { addedition, removeedition } = editionSlice.actions;

export const editionData = (state) => state.edition;

export default editionSlice.reducer;
