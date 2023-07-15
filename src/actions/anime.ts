import { createAction } from "@reduxjs/toolkit";

export const addBookmark = createAction<number>("anime/addBookmark");

export const nextPage = createAction("anime/nextPage");
