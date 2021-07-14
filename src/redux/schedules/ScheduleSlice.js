import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ScheduleRequests, TimeRequests } from "../../apis";
import { setMessage } from "../notifications/NotificationsSlice";

export const getSchedules = createAsyncThunk(
  "schedule/getSchedule",
  async (_, { rejectWithValue }) => {
    try {
      const results = await ScheduleRequests.getActive();
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
      const results = await TimeRequests.postOne(values);
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
      await TimeRequests.deleteOne(id);
      dispatch(setMessage("Success, deleted time"));
      return id;
    } catch (err) {
      dispatch(setMessage("Error, unable to delete time"));
      return rejectWithValue([], err);
    }
  }
);

export const updateTime = createAsyncThunk(
  "schedule/updatetime",
  async (values, { rejectWithValue, dispatch }) => {
    try {
      const { id, body } = values;
      await TimeRequests.updateOne(id, body);
      dispatch(setMessage("Successfully updated time"));
      return { id, body };
    } catch (err) {
      dispatch(setMessage("Error updating time"));
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
    [updateTime.fulfilled]: (state, action) => {
      if (!action.payload.id || !action.payload.body) {
        return state;
      }
      const { id, body } = action.payload;

      const index = state.days.findIndex((day) => day.id === id);
      state.days[index] = { ...state.days[index], ...body };
    },
  },
});

const { reducer } = scheduleSlice;

export default reducer;
