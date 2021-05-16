import { createSlice } from '@reduxjs/toolkit';



export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload
    },
  },
})

const { actions, reducer } = notificationSlice;

export const { setMessage } = actions;

export default reducer;

