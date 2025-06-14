import { configureStore } from "@reduxjs/toolkit";

import todoReducer from "./todoSlice";
import listReducer from "./listSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    lists: listReducer,
  },
});
