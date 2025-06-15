import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTodo } from "../store/redux/todoSlice";
import {
  View,
  Modal,
  Button,
  StyleSheet,
  TextInput,
  Image,
  Text,
} from "react-native";

import ConfirmDelete from "./ConfirmDelete";
import ImagePicker from "./ImagePicker";

function TodoItemModal({ visible, onClose, todo, onDelete }) {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState(todo.text);
  const [newImageUri, setNewImageUri] = useState(null);

  const imageUri = todo.image;

  useEffect(() => {
    if (todo) {
      setInputText(todo.text);
    }
  }, [todo]);

  function editTodoTextHandler() {
    if (!inputText.trim()) {
      console.log("Ingen tekst angivet, afbryder opdatering.");
      return;
    }
    dispatch(updateTodo({ id: todo.id, updatedText: inputText.trim(), imageUri: newImageUri }));
    onClose();
  }

  let imagePreview = <Text>Intet billede taget endnu.</Text>;

  if (todo.image !== null) {
    imagePreview = <Image style={styles.image} source={{ uri: imageUri }} />;
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.imagePreview}>{imagePreview}</View>
        <ImagePicker onImagePicked={setNewImageUri}/>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder={todo.text}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Gem" onPress={editTodoTextHandler} />
          </View>
          <View style={styles.button}>
            <Button title="Annuller" onPress={onClose} color="grey" />
          </View>
          <View style={styles.button}>
            <ConfirmDelete onDelete={() => onDelete()} todoId={todo.id} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default TodoItemModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
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
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e4d0ff",
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
