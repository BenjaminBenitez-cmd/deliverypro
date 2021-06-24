import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    messages: [],
  },
  reducers: {
    setMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

const { actions, reducer } = notificationSlice;

export const { setMessage } = actions;

export default reducer;
