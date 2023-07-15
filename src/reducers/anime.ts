import { createReducer } from "@reduxjs/toolkit";
import { addBookmark, nextPage } from "../actions/anime";

const initialState: { bookmark: number[]; page: number } = {
  bookmark: [],
  page: 1,
};

export default createReducer(initialState, (builder) => {
  builder.addCase(addBookmark, (state, action) => {
    const { payload } = action;
    state.bookmark = [...state.bookmark, payload];
  });
  builder.addCase(nextPage, (state) => {
    state.page = state.page + 1;
  });
});
