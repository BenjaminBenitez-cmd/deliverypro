import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ScheduleRequests } from "../../apis";
import { setMessage } from "../notifications/NotificationsSlice";

export const getSchedules = createAsyncThunk(
  "schedule/getSchedule",
  async (_, { rejectWithValue }) => {
    try {
      const results = await ScheduleRequests.fetchScheduleRequest();
      return results.data.data;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

export const addTime = createAsyncThunk(
  "schedule/addTime",
  async (values, { rejectWithValue, dispatch }) => {
    try {
      const results = await ScheduleRequests.addScheduleTime(values);
      dispatch(setMessage("Success, added time"));
      return results.data.data.time;
    } catch (err) {
      dispatch(setMessage("Error, unable to add time"));
      return rejectWithValue([], err);
    }
  }
);

export const deleteTime = createAsyncThunk(
  "schedule/deleteTime",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await ScheduleRequests.deleteTimeRequest(id);
      dispatch(setMessage("Success, deleted time"));
      return id;
    } catch (err) {
      dispatch(setMessage("Error, unable to delete time"));
      return rejectWithValue([], err);
    }
  }
);

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    status: "",
    id: "",
    days: [],
    dates: [],
  },
  extraReducers: {
    [getSchedules.pending]: (state) => {
      state.status = "loading";
    },
    [getSchedules.fulfilled]: (state, action) => {
      state.days = action.payload.schedule.days;
      state.dates = action.payload.days_available;
      state.id = action.payload.schedule.id;
      state.status = "success";
    },
    [getSchedules.rejected]: (state) => {
      state.status = "failed";
    },
    [addTime.fulfilled]: (state, action) => {
      state.days.push(action.payload);
      state.status = "success";
    },
    [deleteTime.fulfilled]: (state, action) => {
      if (!action.payload) {
        return state;
      }
      const index = state.days.findIndex((day) => day.id === action.payload);
      state.days.splice(index, 1);
      state.status = "success";
    },
  },
});

const { reducer } = scheduleSlice;

export default reducer;
