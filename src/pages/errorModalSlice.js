import { createSlice } from '@reduxjs/toolkit';

export const errorModalSlice = createSlice({
  name: 'errorModal',
  initialState: {
    isOpen: false,
    message: '',
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.message = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.message = '';
    },
  },
});

export const { openModal, closeModal } = errorModalSlice.actions;

export const displayErrorModal = (message) => (dispatch) => {
  dispatch(openModal(message));
  setTimeout(() => {
    dispatch(closeModal());
  }, 2000);  // The modal will close after 3 seconds
};

export default errorModalSlice.reducer;
