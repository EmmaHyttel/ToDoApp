import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo(state, action) {
      const { id, text, image, completed, listId } = action.payload || {};

      const trimmedText = typeof text === "string" ? text.trim() : "";

      if (!trimmedText) {
        console.log("Ingen tekst angivet, afbryder tilføjelse.");
        return;
      }

      state.todos.push({
        id,
        text: trimmedText,
        image: image || null,
        completed: completed,
        listId: listId || 1,
      });
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo(state, action) {
      const { id, updatedText } = action.payload;

      const todoIndex = state.todos.findIndex((todo) => todo.id === id);

      if (todoIndex !== -1) {
        state.todos[todoIndex].text = updatedText;
      }
    },
    toggleCompleteTodo(state, action) {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );

      if (todoIndex !== -1) {
        state.todos[todoIndex].completed = !state.todos[todoIndex].completed;
      }
    },
  },
});

export default todoSlice.reducer;

export const { addTodo, removeTodo, updateTodo, toggleCompleteTodo } =
  todoSlice.actions;
