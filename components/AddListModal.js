import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { addList } from "../store/redux/listSlice";

function AddListModal({ visible, onClose }) {
  const [listTitle, setListTitle] = useState("");
  const dispatch = useDispatch();

  function handleAddList() {
    const trimmed = listTitle.trim();
    if (!trimmed) return;

    dispatch(addList({ id: uuidv4(), title: trimmed }));
    setListTitle("");
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Tilføj ny liste</Text>
            <TextInput
              style={styles.input}
              placeholder="Navn på liste"
              value={listTitle}
              onChangeText={setListTitle}
            />
            <View>
              <Button title="Annuller" color="#888" onPress={onClose} />
              <Button title="Tilføj" onPress={handleAddList} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default AddListModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#c9a0ff",
    backgroundColor: "#f3e8ff",
    color: "#120438",
    borderRadius: 8,
    width: "100%",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
