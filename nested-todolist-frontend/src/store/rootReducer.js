import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./../features/authSlice";
// import collectionReducer from "./../features/collectionSlice";
// import taskReducer from "./../features/taskSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // collections: collectionReducer,
    // tasks: taskReducer,
  },
});

export default store;
