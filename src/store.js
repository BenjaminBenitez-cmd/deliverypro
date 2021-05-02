import { configureStore } from '@reduxjs/toolkit';
import DeliveryReducer from 'features/deliveries/DeliverySlice';
import NotificationReducer from 'features/notifications/NotificationsSlice';
import AuthenticationReducer from 'features/auth/AuthSlice';
import SchedulesReducer from 'features/schedules/ScheduleSlice';

export default configureStore({
    reducer: { 
        deliveries: DeliveryReducer,
        notification: NotificationReducer,
        user: AuthenticationReducer,
        schedule: SchedulesReducer
    },
})