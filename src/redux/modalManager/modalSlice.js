import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeModal: null,
  modalProps: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.activeModal = action.payload.name;
      state.modalProps = action.payload.props || {};
    },
    closeModal: (state) => {
      state.activeModal = null;
      state.modalProps = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
