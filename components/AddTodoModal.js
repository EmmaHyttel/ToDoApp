import { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Button,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useDispatch } from "react-redux";
import { addTodo } from "../store/redux/todoSlice";
import { v4 as uuidv4 } from "uuid";

import TodoInput from "./TodoInput";
import ImagePicker from "./ImagePicker";

function AddTodoModal({ modalIsVisible, onCancel }) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [imageUri, setImageUri] = useState(null);

  const handleAddTodo = () => {
    if (!text?.trim()) {
      console.log("Ingen tekst angivet, afbryder tilføjelse.");
      return;
    }

    dispatch(
      addTodo({
        id: uuidv4(),
        text: text.trim(),
        image: imageUri || null,
        completed: false,
      })
    );

    setText("");
    setImageUri(null);
    onCancel();
  };

  return (
    <Modal visible={modalIsVisible} animationType="slide">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Ny To-do</Text>

            <TodoInput value={text} onChangeText={setText} />

            <ImagePicker onImagePicked={setImageUri} />

            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button title="Afbryd" onPress={onCancel} color="#f31282" />
              </View>
              <View style={styles.button}>
                <Button
                  title="Tilføj"
                  onPress={handleAddTodo}
                  color="#b180f0"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default AddTodoModal;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fef6ff",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#5e0acc",
    textAlign: "center",
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 6,
  },
});
