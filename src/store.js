import { configureStore } from "@reduxjs/toolkit";
import DeliveryReducer from "redux/deliveries/DeliverySlice";
import NotificationReducer from "redux/notifications/NotificationsSlice";
import AuthenticationReducer from "redux/auth/AuthSlice";
import SchedulesReducer from "redux/schedules/ScheduleSlice";

export default configureStore({
  reducer: {
    deliveries: DeliveryReducer,
    notification: NotificationReducer,
    user: AuthenticationReducer,
    schedule: SchedulesReducer,
  },
});
