import { Alert, Button } from "react-native";
import { useDispatch } from "react-redux";
import { removeTodo } from "../store/redux/todoSlice";

function ConfirmDelete({ todoId, onDelete }) {
  const dispatch = useDispatch();

  function confirmDeleteHandler() {
    Alert.alert(
      "Slet to-do",
      "Er du sikker på, at du vil slette denne to-do?",
      [
        {
          text: "Annuller",
          style: "cancel",
        },
        {
          text: "Slet",
          style: "destructive",
          onPress: () => {
            dispatch(removeTodo(todoId));
            if (onDelete) onDelete();
          },
        },
      ]
    );
  }

  return <Button title="Slet" onPress={confirmDeleteHandler} color="red" />;
}

export default ConfirmDelete;
