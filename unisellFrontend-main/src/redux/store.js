// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import messagesReducer from "./features/messages/messagesSlice";
import adminReducer from "./features/admin/adminSlice"; // Regular reducers first

// Then import API services
import authApi from "./features/auth/authApi";
import productsApi from "./features/products/productsApi";
import orderApi from "./features/orders/orderApi";
import reviewApi from "./features/reviews/reviewApi";
import statsApi from "./features/stats/statsApi";

export const store = configureStore({
  reducer: {
    // Regular reducers
    auth: authReducer,
    cart: cartReducer,
    messages: messagesReducer,
    admin: adminReducer,

    // API reducers
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productsApi.middleware,
      orderApi.middleware,
      reviewApi.middleware,
      statsApi.middleware
    ),
});
