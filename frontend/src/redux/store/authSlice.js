import { createSlice } from "@reduxjs/toolkit";

// Load user data from localStorage (if available)
const storedUser = JSON.parse(localStorage.getItem("authUser")) || null;

const initialState = {
  user: storedUser,
  isAuthenticated: !!storedUser,
  role: storedUser?.role || "USER",
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.user?.role;
      state.isAuthenticated = true;

      // Save user to localStorage
      localStorage.setItem("authUser", JSON.stringify(action.payload.user));
    },
    userLoggedOut: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;

      // Remove user from localStorage
      localStorage.removeItem("authUser");
    },
  },
});

// Action creators are generated for each case reducer function
export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
