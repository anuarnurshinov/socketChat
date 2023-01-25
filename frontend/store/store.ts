import { createWrapper } from "next-redux-wrapper"
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { authSlice } from "./authSlice"
import { messageSlice } from "./messageSlice"

const makeStore = () =>
  configureStore({
    reducer: {
      [messageSlice.name]: messageSlice.reducer,
      [authSlice.name]: authSlice.reducer,
    },
    devTools: true,
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore["getState"]>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>

export const wrapper = createWrapper<AppStore>(makeStore)
