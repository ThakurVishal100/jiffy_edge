import { configureStore } from '@reduxjs/toolkit';
import activityReducer  from './RecordActivity/activitySlice';
import authReducer from './protectedroute/authSlice';
import userReducer from './slices/userSlice';
// import activityLogReducer from './slices/activityLogSlice'; 

 const store = configureStore({
  reducer: {
    activity: activityReducer, 
    auth: authReducer,
    users: userReducer,
    // activityLog: activityLogReducer,
  },
});


export default store;
