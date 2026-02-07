import { configureStore } from "@reduxjs/toolkit";

// slices
import tabSlice from "./tabSlice";
import collapsedSlice from "./collapsedSlice";

const store = configureStore({
    reducer: {
        tab: tabSlice,
        collapsed: collapsedSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;