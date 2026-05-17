// src/slices/userSlice.ts

import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { api } from "../../Config/Api";

import type {
  User,
  UserState,
} from "../../types/userTypes";

import type { RootState } from "../Store";

// ================= INITIAL STATE =================

const initialState: UserState = {

  user: null,

  loading: false,

  error: null,

  profileUpdated: false,

};

// ================= API URL =================

const API_URL = "/api/users";

// ================= FETCH USER PROFILE =================

export const fetchUserProfile = createAsyncThunk<
  User,
  { jwt: string; navigate: any }
>(

  "user/fetchUserProfile",

  async (
    { jwt }: { jwt: string; navigate: any },
    { rejectWithValue }
  ) => {

    try {

      const response = await api.get(
        `${API_URL}/profile`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log("user profile", response.data);

      return response.data;

    } catch (error: any) {

      console.log("error", error.response);

      return rejectWithValue(
        "Failed to fetch user profile"
      );
    }
  }
);

// ================= USER SLICE =================

const userSlice = createSlice({

  name: "user",

  initialState,

  reducers: {

    resetUserState: (state) => {

      state.user = null;

      state.loading = false;

      state.error = null;

      state.profileUpdated = false;

    },
  },

  extraReducers: (builder) => {

    builder

      // ================= FETCH USER =================

      .addCase(fetchUserProfile.pending, (state) => {

        state.loading = true;

        state.error = null;

      })

      .addCase(
        fetchUserProfile.fulfilled,

        (state, action: PayloadAction<User>) => {

          state.user = action.payload;

          state.loading = false;

        }
      )

      .addCase(
        fetchUserProfile.rejected,

        (state, action) => {

          state.loading = false;

          state.error = action.payload as string;

        }
      );
  },
});

// ================= EXPORT ACTIONS =================

export const { resetUserState } =
  userSlice.actions;

// ================= EXPORT REDUCER =================

export default userSlice.reducer;

// ================= SELECTORS =================

export const selectUser = (
  state: RootState
) => state.user.user;

export const selectUserLoading = (
  state: RootState
) => state.user.loading;

export const selectUserError = (
  state: RootState
) => state.user.error;