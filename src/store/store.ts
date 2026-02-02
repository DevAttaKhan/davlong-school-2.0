import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// Use ES module import for Vite compatibility
import storage from "redux-persist/es/storage";

import { apiSlice } from "./apis/base.api";
import { mapApi } from "./apis/map.api";
import authSlice from "./slices/auth.slice";
import uiSlice from "./slices/ui.slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "ui"],
};

const rootReducer = combineReducers({
  auth: authSlice,
  ui: uiSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [mapApi.reducerPath]: mapApi.reducer,
});

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware, mapApi.middleware),
  devTools: true,
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
