import { View, Modal, Text, Button, StyleSheet } from "react-native";

import EditTodoForm from "./EditTodoForm";

function TodoItemModal({ visible, onClose, todo, onEdit, onDelete }) {
  console.log("TodoItemModal rendered with todo:", todo);
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <EditTodoForm
          initialText={todo.text}
          onSave={(newText) => {
            onEdit(todo.id, newText);
            onClose();
          }}
          onDelete={() => {
            onDelete(todo.id);
            onClose();
          }}
          onCancel={onClose}
          todoId={todo.id}
        />
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
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: "30%",
    marginHorizontal: 8,
  },
});
