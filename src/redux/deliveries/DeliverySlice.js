import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DeliveryRequests } from "../../apis";
import { setMessage } from "../notifications/NotificationsSlice";

export const getDeliveries = createAsyncThunk(
  "deliveries/getdeliveries",
  async (_, { rejectWithValue }) => {
    try {
      const results = await DeliveryRequests.fetchDeliveriesRequest();
      return results.data.data.deliveries;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

export const addDelivery = createAsyncThunk(
  "deliveries/addDelivery",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const results = await DeliveryRequests.postDeliveryRequest(id);
      dispatch(setMessage("Success, added delivery"));
      return results.data.data.delivery;
    } catch (err) {
      dispatch(setMessage("Error, unable to add delivery"));
      return rejectWithValue([], err);
    }
  }
);

export const toggleDelivery = createAsyncThunk(
  "deliveries/toggleDelivery",
  async (index, { rejectWithValue, dispatch }) => {
    try {
      const response = await DeliveryRequests.toggleDeliveryRequest(index);
      dispatch(setMessage("Toggled fullfillment status"));
      return response.data.data.delivery;
    } catch (err) {
      dispatch(setMessage("Unable to change delivery status"));
      return rejectWithValue([], err);
    }
  }
);

export const deliverySlice = createSlice({
  name: "deliveries",
  initialState: {
    status: "",
    deliveries: [],
    filter: {
      value: "false",
      column: "delivery_status",
    },
  },
  reducers: {
    filterDeliveries: (state, action) => {
      state.filter = action.payload;
    },
    updateDelivery: (state, action) => {
      state.deliveries[action.payload] = true;
    },
  },
  extraReducers: {
    [getDeliveries.pending]: (state) => {
      state.status = "loading";
    },
    [getDeliveries.fulfilled]: (state, action) => {
      state.deliveries = action.payload;
      state.status = "success";
    },
    [getDeliveries.rejected]: (state) => {
      state.status = "failed";
    },
    [addDelivery.pending]: (state) => {
      state.status = "loading";
    },
    [addDelivery.fulfilled]: (state, action) => {
      state.deliveries.push(action.payload);
      state.status = "success";
    },
    [addDelivery.rejected]: (state) => {
      state.status = "failed";
    },
    [toggleDelivery.fulfilled]: (state, action) => {
      const { id, delivery_status } = action.payload;
      const index = state.deliveries.findIndex(
        (delivery) => delivery.id === id
      );
      if (index === null) {
        return state;
      }
      state.deliveries[index].delivery_status = delivery_status;
      state.status = "success";
    },
  },
});

const { actions, reducer } = deliverySlice;

export const { filterDeliveries, updateDelivery } = actions;

export default reducer;
