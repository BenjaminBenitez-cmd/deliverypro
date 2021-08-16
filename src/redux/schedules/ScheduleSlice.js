import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ScheduleRequests, TimeRequests } from "../../apis";
import { setMessage } from "../notifications/NotificationsSlice";

export const getSchedules = createAsyncThunk(
  "schedule/getSchedules",
  async (_, { rejectWithValue }) => {
    try {
      const results = await ScheduleRequests.getMany();
      return results.data.data;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

export const addSchedule = createAsyncThunk(
  "schedule/addSchedule",
  async (values, { rejectWithValue }) => {
    try {
      const results = await ScheduleRequests.createOne(values);
      return { ...results.data.data.schedule, ...values };
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

export const addTime = createAsyncThunk(
  "schedule/addTime",
  async (values, { rejectWithValue, dispatch }) => {
    try {
      const results = await TimeRequests.postOne(values.schedule_id, values);
      dispatch(setMessage("Success, added time"));
      return { ...results.data.data.time, ...values };
    } catch (err) {
      dispatch(setMessage("Error, unable to add time"));
      return rejectWithValue([], err);
    }
  }
);

export const deleteTime = createAsyncThunk(
  "schedule/deleteTime",
  async (values, { rejectWithValue, dispatch }) => {
    try {
      await TimeRequests.deleteOne(values.schedule_id, values.id);
      dispatch(setMessage("Success, deleted time"));
      return values;
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
      const body = { time_start: values.time_start, time_end: values.time_end };
      await TimeRequests.updateOne(values.schedule_id, values.id, body);
      dispatch(setMessage("Successfully updated time"));
      return values;
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
    schedules: [],
    daysAvailable: [],
    active: null,
  },
  extraReducers: {
    [getSchedules.pending]: (state) => {
      state.status = "loading";
    },
    [getSchedules.fulfilled]: (state, action) => {
      //set days available
      state.daysAvailable = action.payload.days_available;
      //set the new schedules
      state.schedules = action.payload.schedules;
      if (!action.payload.schedules) return;
      //find an active schedule
      let activeSchedule = null;
      if (action.payload?.schedules.length > 0) {
        activeSchedule = action.payload.schedules.find(
          (schedule) => schedule.active === true
        );
      }
      //add active schedule
      if (activeSchedule !== null) {
        state.active = activeSchedule;
      }

      //set the active schedule
      state.status = "success";
    },
    [getSchedules.rejected]: (state) => {
      state.status = "failed";
    },
    [addSchedule.rejected]: (state) => {
      state.status = "Failed";
    },
    [addSchedule.fulfilled]: (state, action) => {
      state.status = "Success";
      if (!state.active) {
        state.active = action.payload;
      }
      state.schedules.push(action.payload);
    },
    [addSchedule.pending]: (state) => {
      state.status = "Loading";
    },
    [addTime.fulfilled]: (state, action) => {
      if (!action.payload) return state;
      const scheduleIndex = state.schedules.findIndex(
        (schedule) => schedule.id === action.payload.schedule_id.toString()
      );
      state.schedules[scheduleIndex].time.push(action.payload);
      //find an active schedule
      let activeSchedule = null;
      if (state.schedules.length > 0) {
        activeSchedule = state.schedules.find(
          (schedule) => schedule.active === true
        );
      }

      //add active schedule
      if (activeSchedule !== null) {
        state.active = activeSchedule;
      }
      state.status = "success";
    },
    [deleteTime.fulfilled]: (state, action) => {
      if (!action.payload) {
        return state;
      }
      //get the schedules index
      const scheduleIndex = state.schedules.findIndex(
        (schedule) => schedule.id === action.payload.schedule_id.toString()
      );

      //get the times index
      const timeIndex = state.schedules[scheduleIndex].time.findIndex(
        (time) => time.id === action.payload.id
      );
      state.schedules[scheduleIndex].time.splice(timeIndex, 1);
      state.status = "success";
    },
    [updateTime.fulfilled]: (state, action) => {
      if (
        !action.payload.id ||
        !action.payload.time_end ||
        !action.payload.time_start ||
        !action.payload.schedule_id
      ) {
        return state;
      }
      //get the schedules index
      const scheduleIndex = state.schedules.findIndex(
        (schedule) => schedule.id === action.payload.schedule_id
      );
      //get the times index
      const timeIndex = state.schedules[scheduleIndex].time.findIndex(
        (time) => time.id === action.payload.id
      );
      //update the time
      state.schedules[scheduleIndex].time[timeIndex] = {
        ...state.schedules[scheduleIndex].time[timeIndex],
        time_start: action.payload.time_start,
        time_end: action.payload.time_end,
      };

      state.status = "success";
    },
  },
});

const { reducer } = scheduleSlice;

export default reducer;
