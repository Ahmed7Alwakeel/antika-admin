import { configureStore } from "@reduxjs/toolkit";
import breadCrumbsData from "./breadCrumbsData";
export const store = configureStore({
    reducer: {
        breadCrumbsData
    }
})