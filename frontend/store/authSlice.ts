import { User } from "@/app/types/users"
import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"
import { AppState } from "./store"

export type AuthState = {
  isAuthorized: boolean
  user: User | null
}

const initialState: AuthState = {
  isAuthorized: false,
  user: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
      state.isAuthorized = true
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", action.payload)
      return {
        ...state,
        ...action.payload.auth,
      }
    },
  },
})

export const { setUser } = authSlice.actions

export const selectAuthStatus = (state: AppState) => state.auth.isAuthorized
export const selectCurrentUser = (state: AppState) => state.auth.user

export default authSlice.reducer
