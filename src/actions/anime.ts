import { createAction } from "@reduxjs/toolkit";

export const addBookmark = createAction<string>("anime/addBookmark");

export const nextPage = createAction("anime/nextPage");
