// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // ✅ correct path

const store = configureStore({
  reducer: {
    auth: authReducer, // 👈 add reducer here
  },
});

export default store;
