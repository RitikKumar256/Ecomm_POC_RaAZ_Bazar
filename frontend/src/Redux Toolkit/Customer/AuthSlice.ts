import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { api } from "../../Config/Api";
import { resetSellerState } from "../Seller/sellerSlice";
import type {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  ResetPasswordRequest,
  ApiResponse,
  AuthState,
} from "../../types/authTypes";

import type { RootState } from "../Store";

import { resetUserState } from "./UserSlice";
import { resetCartState } from "./CartSlice";

// ================= INITIAL STATE =================

const initialState: AuthState = {
  jwt: null,
  role: null,
  loading: false,
  error: null,
  otpSent: false,
};

// ================= API URL =================

const API_URL = "/auth";

// ================= TOKEN HANDLER =================

const saveTokenByRole = (
  role: string,
  token: string
) => {

  // REMOVE OLD TOKENS
  localStorage.removeItem("admin_jwt");
  localStorage.removeItem("seller_jwt");
  localStorage.removeItem("customer_jwt");

  // ADMIN
  if (role === "ROLE_ADMIN") {

    localStorage.setItem("admin_jwt", token);

  }

  // SELLER
  else if (role === "ROLE_SELLER") {

    localStorage.setItem("seller_jwt", token);

  }

  // CUSTOMER
  else {

    localStorage.setItem("customer_jwt", token);
  }

  localStorage.setItem("role", role);
};

// ================= NAVIGATION HANDLER =================

const navigateByRole = (
  role: string,
  navigate: any
) => {

  if (role === "ROLE_ADMIN") {

    navigate("/admin");

  } else if (role === "ROLE_SELLER") {

    navigate("/seller");

  } else {

    navigate("/");
  }
};

// ================= SEND OTP =================

export const sendLoginSignupOtp = createAsyncThunk<
  ApiResponse,
  { email: string }
>(
  "auth/sendLoginSignupOtp",

  async ({ email }, { rejectWithValue }) => {

    try {

      const response = await api.post(
        `${API_URL}/sent/login-signup-otp`,
        { email }
      );

      return response.data;

    } catch (error: any) {

      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to send OTP"
      );
    }
  }
);

// ================= SIGNUP =================

export const signup = createAsyncThunk<
  AuthResponse,
  SignupRequest
>(
  "auth/signup",

  async (signupRequest, { rejectWithValue }) => {

    try {

      const response = await api.post<AuthResponse>(
        `${API_URL}/signup`,
        signupRequest
      );

      const { jwt, role } = response.data;

      saveTokenByRole(role, jwt);

      navigateByRole(
        role,
        signupRequest.navigate
      );

      return response.data;

    } catch (error: any) {

      return rejectWithValue(
        error.response?.data?.message ||
        "Signup failed"
      );
    }
  }
);

// ================= SIGNIN =================

export const signin = createAsyncThunk<
  AuthResponse,
  LoginRequest
>(
  "auth/signin",

  async (loginRequest, { rejectWithValue }) => {

    try {

      const response = await api.post<AuthResponse>(
        `${API_URL}/signin`,
        loginRequest
      );

      const { jwt, role } = response.data;

      saveTokenByRole(role, jwt);

      navigateByRole(
        role,
        loginRequest.navigate
      );

      return response.data;

    } catch (error: any) {

      return rejectWithValue(
        error.response?.data?.message ||
        "Signin failed"
      );
    }
  }
);

// ================= RESET PASSWORD =================

export const resetPassword = createAsyncThunk<
  ApiResponse,
  ResetPasswordRequest
>(
  "auth/resetPassword",

  async (
    resetPasswordRequest,
    { rejectWithValue }
  ) => {

    try {

      const response = await api.post<ApiResponse>(
        `${API_URL}/reset-password`,
        resetPasswordRequest
      );

      return response.data;

    } catch (error: any) {

      return rejectWithValue(
        error.response?.data?.message ||
        "Reset password failed"
      );
    }
  }
);

// ================= RESET PASSWORD REQUEST =================

export const resetPasswordRequest = createAsyncThunk<
  ApiResponse,
  { email: string }
>(
  "auth/resetPasswordRequest",

  async ({ email }, { rejectWithValue }) => {

    try {

      const response = await api.post<ApiResponse>(
        `${API_URL}/reset-password-request`,
        { email }
      );

      return response.data;

    } catch (error: any) {

      return rejectWithValue(
        error.response?.data?.message ||
        "Reset password request failed"
      );
    }
  }
);

// ================= SLICE =================

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {

logout: (state) => {

  localStorage.removeItem("admin_jwt");
  localStorage.removeItem("seller_jwt");
  localStorage.removeItem("customer_jwt");
  localStorage.removeItem("role");

  state.jwt = null;
  state.role = null;
  state.loading = false;
  state.error = null;
  state.otpSent = false;
},
  },

  extraReducers: (builder) => {

    builder

      // SEND OTP

      .addCase(sendLoginSignupOtp.pending, (state) => {

        state.loading = true;
        state.error = null;
      })

      .addCase(sendLoginSignupOtp.fulfilled, (state) => {

        state.loading = false;
        state.otpSent = true;
      })

      .addCase(sendLoginSignupOtp.rejected, (state, action) => {

        state.loading = false;
        state.error = action.payload as string;
      })

      // SIGNUP

      .addCase(signup.pending, (state) => {

        state.loading = true;
        state.error = null;
      })

      .addCase(
        signup.fulfilled,
        (
          state,
          action: PayloadAction<AuthResponse>
        ) => {

          state.jwt = action.payload.jwt;
          state.role = action.payload.role;
          state.loading = false;
        }
      )

      .addCase(signup.rejected, (state, action) => {

        state.loading = false;
        state.error = action.payload as string;
      })

      // SIGNIN

      .addCase(signin.pending, (state) => {

        state.loading = true;
        state.error = null;
      })

      .addCase(
        signin.fulfilled,
        (
          state,
          action: PayloadAction<AuthResponse>
        ) => {

          state.jwt = action.payload.jwt;
          state.role = action.payload.role;
          state.loading = false;
        }
      )

      .addCase(signin.rejected, (state, action) => {

        state.loading = false;
        state.error = action.payload as string;
      })

      // RESET PASSWORD

      .addCase(resetPassword.pending, (state) => {

        state.loading = true;
        state.error = null;
      })

      .addCase(resetPassword.fulfilled, (state) => {

        state.loading = false;
      })

      .addCase(resetPassword.rejected, (state, action) => {

        state.loading = false;
        state.error = action.payload as string;
      })

      // RESET PASSWORD REQUEST

      .addCase(resetPasswordRequest.pending, (state) => {

        state.loading = true;
        state.error = null;
      })

      .addCase(resetPasswordRequest.fulfilled, (state) => {

        state.loading = false;
      })

      .addCase(resetPasswordRequest.rejected, (state, action) => {

        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// ================= EXPORTS =================

export const { logout } = authSlice.actions;

export default authSlice.reducer;

// ================= LOGOUT FUNCTION =================

export const performLogout =
  (
    navigate: any
  ) =>
  async (dispatch: any) => {

    dispatch(logout());

    dispatch(resetUserState());

    dispatch(resetCartState());

    dispatch(resetSellerState());

    window.location.href = "/";
};

// ================= SELECTORS =================

export const selectAuth = (
  state: RootState
) => state.auth;

export const selectAuthLoading = (
  state: RootState
) => state.auth.loading;

export const selectAuthError = (
  state: RootState
) => state.auth.error;