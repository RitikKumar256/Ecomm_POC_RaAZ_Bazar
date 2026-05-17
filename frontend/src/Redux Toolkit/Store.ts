// src/Redux Toolkit/Store.ts

import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";

import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

// ================= CUSTOMER SLICES =================

import authReducer from "./Customer/AuthSlice";

import UserSlice from "./Customer/UserSlice";

import ProductSlice from "./Customer/ProductSlice";

import CartSlice from "./Customer/CartSlice";

import OrderSlice from "./Customer/OrderSlice";

import CouponSlice from "./Customer/CouponSlice";

import ReviewSlice from "./Customer/ReviewSlice";

import WishlistSlice from "./Customer/WishlistSlice";

import AiChatBotSlice from "./Customer/AiChatBotSlice";

import CustomerSlice from "./Customer/Customer/CustomerSlice";

// ================= SELLER SLICES =================

import sellerSlice from "./Seller/sellerSlice";

import sellerAuthenticationSlice from "./Seller/sellerAuthenticationSlice";

import sellerProductSlice from "./Seller/sellerProductSlice";

import sellerOrderSlice from "./Seller/sellerOrderSlice";

import payoutSlice from "./Seller/payoutSlice";

import transactionSlice from "./Seller/transactionSlice";

import revenueChartSlice from "./Seller/revenueChartSlice";

// ================= ADMIN SLICES =================

import AdminCouponSlice from "./Admin/AdminCouponSlice";

import DealSlice from "./Admin/DealSlice";

import AdminSlice from "./Admin/AdminSlice";

// ================= ROOT REDUCER =================

const rootReducer = combineReducers({

  // CUSTOMER

  auth: authReducer,

  user: UserSlice,

  products: ProductSlice,

  cart: CartSlice,

  orders: OrderSlice,

  coupone: CouponSlice,

  review: ReviewSlice,

  wishlist: WishlistSlice,

  aiChatBot: AiChatBotSlice,

  homePage: CustomerSlice,

  // SELLER

  sellers: sellerSlice,

  sellerAuth: sellerAuthenticationSlice,

  sellerProduct: sellerProductSlice,

  sellerOrder: sellerOrderSlice,

  payouts: payoutSlice,

  transaction: transactionSlice,

  revenueChart: revenueChartSlice,

  // ADMIN

  adminCoupon: AdminCouponSlice,

  adminDeals: DealSlice,

  admin: AdminSlice,

  deal: DealSlice,
});

// ================= STORE =================

const store = configureStore({

  reducer: rootReducer,

});

// ================= TYPES =================

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof rootReducer>;

// ================= CUSTOM HOOKS =================

export const useAppDispatch = () =>
  useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;

// ================= EXPORT STORE =================

export default store;