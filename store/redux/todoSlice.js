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
      console.log("listId", listId);
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
      const { id, updatedText, updatedUri } = action.payload;

      const todo = state.todos.find((todo) => todo.id === id);

      if (todo) {
        todo.text = updatedText;
        if (updatedUri !== undefined) {
          todo.image = updatedUri;
        }
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
