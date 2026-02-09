import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type LayoutView = "table" | "cards" | "grid";

interface UiState {
  stopLayoutView: LayoutView;
  routeTemplateLayoutView: LayoutView;
  templateGroupLayoutView: LayoutView;
  eventLayoutView: LayoutView;
  venueLayoutView: LayoutView;
  sharedInventoryLayoutView: LayoutView;
  bookingLayoutView: LayoutView;
  notificationCount: number;
}

const initialState: UiState = {
  stopLayoutView: "table",
  routeTemplateLayoutView: "table",
  templateGroupLayoutView: "table",
  eventLayoutView: "table",
  venueLayoutView: "table",
  sharedInventoryLayoutView: "table",
  bookingLayoutView: "table",
  notificationCount: 0,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setStopLayoutView: (state, action: PayloadAction<LayoutView>) => {
      state.stopLayoutView = action.payload;
    },
    setRouteTemplateLayoutView: (state, action: PayloadAction<LayoutView>) => {
      state.routeTemplateLayoutView = action.payload;
    },
    setTemplateGroupLayoutView: (state, action: PayloadAction<LayoutView>) => {
      state.templateGroupLayoutView = action.payload;
    },
    setEventLayoutView: (state, action: PayloadAction<LayoutView>) => {
      state.eventLayoutView = action.payload;
    },
    setVenueLayoutView: (state, action: PayloadAction<LayoutView>) => {
      state.venueLayoutView = action.payload;
    },
    setSharedInventoryLayoutView: (
      state,
      action: PayloadAction<LayoutView>
    ) => {
      state.sharedInventoryLayoutView = action.payload;
    },
    setBookingLayoutView: (state, action: PayloadAction<LayoutView>) => {
      state.bookingLayoutView = action.payload;
    },
  },
});

export const {
  setStopLayoutView,
  setRouteTemplateLayoutView,
  setTemplateGroupLayoutView,
  setEventLayoutView,
  setVenueLayoutView,
  setSharedInventoryLayoutView,
  setBookingLayoutView,
} = uiSlice.actions;

export default uiSlice.reducer;
