import { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

import { useDispatch } from "react-redux";
import { updateTodo } from "../store/redux/todoSlice";

import ConfirmDelete from "./ConfirmDelete";

function EditTodoForm({ initialText, todoId, onCancel, onDelete }) {
  const dispatch = useDispatch();

  const [text, setText] = useState(initialText);

  function changeTextHandler() {
    if (!text.trim()) {
      console.log("Ingen tekst angivet, afbryder opdatering.");
      return;
    }
    dispatch(updateTodo({ id: todoId, updatedText: text.trim() }));
    onCancel();
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={setText}
        placeholder={initialText}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Gem" onPress={changeTextHandler} />
        </View>
        <View style={styles.button}>
          <Button title="Annuller" onPress={() => onCancel()} color="grey" />
        </View>
      </View>
      <View style={styles.button}>
        <ConfirmDelete onDelete={() => onDelete()} todoId={todoId} />
      </View>
    </View>
  );
}

export default EditTodoForm;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    color: "#120438",
    borderRadius: 6,
    width: "100%",
    padding: 16,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: "30%",
    marginHorizontal: 8,
  },
});
