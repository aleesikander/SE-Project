import { createSlice } from "@reduxjs/toolkit";

// Utility functions for localStorage
const loadAuthState = () => {
  try {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const adminAccess = localStorage.getItem("adminAccess");

    return {
      isLoggedIn: !!token,
      token: token || null,
      user: user ? JSON.parse(user) : null,
      adminAccess: adminAccess ? JSON.parse(adminAccess) : false,
      adminPermissions:
        JSON.parse(localStorage.getItem("adminPermissions")) || [],
    };
  } catch (err) {
    console.error("Failed to load auth state:", err);
    return {
      isLoggedIn: false,
      token: null,
      user: null,
      adminAccess: false,
      adminPermissions: [],
    };
  }
};

const initialState = loadAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.adminAccess = action.payload.user?.role === "admin";
      state.adminPermissions = action.payload.user?.permissions || [];

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem(
        "adminAccess",
        JSON.stringify(action.payload.user?.role === "admin")
      );
      localStorage.setItem(
        "adminPermissions",
        JSON.stringify(action.payload.user?.permissions || [])
      );
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.adminAccess = action.payload.user?.role === "admin";
      state.adminPermissions = action.payload.user?.permissions || [];

      if (action.payload.token) {
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      }
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem(
        "adminAccess",
        JSON.stringify(action.payload.user?.role === "admin")
      );
      localStorage.setItem(
        "adminPermissions",
        JSON.stringify(action.payload.user?.permissions || [])
      );
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
      state.adminAccess = false;
      state.adminPermissions = [];

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("adminAccess");
      localStorage.removeItem("adminPermissions");
    },
    tokenRefresh: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    updateAdminPermissions: (state, action) => {
      state.adminPermissions = action.payload;
      localStorage.setItem("adminPermissions", JSON.stringify(action.payload));
    },
  },
});

export const {
  loginSuccess,
  setUser,
  logout,
  tokenRefresh,
  updateAdminPermissions,
} = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectIsAdmin = (state) => state.auth.adminAccess;
export const selectAdminPermissions = (state) => state.auth.adminPermissions;
export const hasAdminPermission = (state, permission) =>
  state.auth.adminPermissions.includes(permission);

export default authSlice.reducer;
