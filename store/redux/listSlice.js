import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "list",
  initialState: {
    lists: [],
  },
  reducers: {
    addList(state, action) {
      const { id, title } = action.payload || {};
      state.lists.push({
        id,
        title: title.trim(),
      });
    },
    removeList(state, action) {
      state.lists = state.lists.filter((list) => list.id !== action.payload);
    },
  },
});

export default listSlice.reducer;

export const { addList, removeList } = listSlice.actions;
