import { configureStore } from "@reduxjs/toolkit";
import breadCrumbsData from "./breadCrumbsData";
import authData from "../../modules/auth/store/redux/authData";


export const store = configureStore({
    reducer: {
        breadCrumbsData,
        authData

    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;