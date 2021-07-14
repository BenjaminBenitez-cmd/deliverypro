import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DeliveryRequests } from "../../apis";
import { setMessage } from "../notifications/NotificationsSlice";

export const getDeliveries = createAsyncThunk(
  "deliveries/getdeliveries",
  async (_, { rejectWithValue }) => {
    try {
      const results = await DeliveryRequests.getMany();
      return results.data.data.deliveries;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

export const addDelivery = createAsyncThunk(
  "deliveries/addDelivery",
  async (values, { rejectWithValue, dispatch }) => {
    try {
      const results = await DeliveryRequests.postOne(values);
      dispatch(setMessage("Successfully added delivery"));
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
      const response = await DeliveryRequests.toggleOne(index);
      dispatch(setMessage("Toggled fullfillment status"));
      return response.data.data.delivery;
    } catch (err) {
      dispatch(setMessage("Unable to change delivery status"));
      return rejectWithValue([], err);
    }
  }
);

export const updateDelivery = createAsyncThunk(
  "deliveries/updateDelivery",
  async (values, { rejectWithValue, dispatch }) => {
    try {
      const { id, body } = values;
      await DeliveryRequests.updateOne(id, body);
      dispatch(setMessage("Updated delivery!"));
      return { id, body };
    } catch (err) {
      dispatch(setMessage("Unable to change delivery status"));
      return rejectWithValue([], err);
    }
  }
);

export const deleteDelivery = createAsyncThunk(
  "deliveries/deleteDelivery",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await DeliveryRequests.deleteOne(id);
      dispatch(setMessage("Deleted delivery"));
      return id;
    } catch (err) {
      dispatch(setMessage("Unable to change delivery status"));
      return rejectWithValue([], err);
    }
  }
);

export const deliverySlice = createSlice({
  name: "deliveries",
  initialState: {
    error: "",
    loading: true,
    deliveries: [],
    filter: {
      value: false,
      data: "delivery_status",
    },
  },
  reducers: {
    filterDeliveries: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [getDeliveries.pending]: (state) => {
      state.loading = true;
    },
    [getDeliveries.fulfilled]: (state, action) => {
      state.deliveries = action.payload;
      state.loading = false;
    },
    [getDeliveries.rejected]: (state) => {
      state.loading = false;
      state.error = "An error occured";
    },
    [addDelivery.pending]: (state) => {
      state.loading = true;
    },
    [addDelivery.fulfilled]: (state, action) => {
      state.loading = false;
      state.deliveries.unshift(action.payload);
    },
    [addDelivery.rejected]: (state) => {
      state.loading = false;
      state.error = "An error occured";
    },
    [toggleDelivery.fulfilled]: (state, action) => {
      state.loading = false;
      const { id, delivery_status } = action.payload;
      const index = state.deliveries.findIndex(
        (delivery) => delivery.id === id
      );
      if (index === null) {
        return state;
      }
      state.deliveries[index].delivery_status = delivery_status;
    },
    [updateDelivery.fulfilled]: (state, action) => {
      state.loading = false;
      const { id, body } = action.payload;
      const index = state.deliveries.findIndex(
        (delivery) => delivery.id === id
      );
      state.deliveries[index] = {
        id,
        ...body,
        geolocation: {
          type: "Point",
          coordinates: [body.longitude, body.latitude],
        },
      };
    },
    [deleteDelivery.fulfilled]: (state, action) => {
      state.loading = false;
      const id = action.payload;

      const index = state.deliveries.findIndex(
        (delivery) => delivery.id === id
      );

      state.deliveries.splice(index, 1);
    },
  },
});

const { actions, reducer } = deliverySlice;

export const { filterDeliveries } = actions;

export default reducer;
