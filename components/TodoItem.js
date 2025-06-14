import { StyleSheet, View, Text, Image } from "react-native";
import { useDispatch } from "react-redux";
import { toggleCompleteTodo } from "../store/redux/todoSlice";

import MyIconButton from "./MyIconButton";

function TodoItem({ text, image, completed, id, openEditModal }) {
  const dispatch = useDispatch();

  const handleCompleteStatusChange = () => {
    dispatch(toggleCompleteTodo(id));
  };

  return (
    <>
      <View style={styles.todoItem}>
        {image && (
          <Image source={{ uri: image }} style={styles.imageThumbnail} />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.todoText}>{text}</Text>
        </View>
        <View style={styles.icon}>
          <MyIconButton
            icon={"create-outline"}
            color="white"
            size={24}
            onPress={openEditModal}
          />
        </View>
        <View style={styles.icon}>
          <MyIconButton
            icon={completed ? "checkmark-circle-outline" : "ellipse-outline"}
            color="white"
            size={24}
            onPress={handleCompleteStatusChange}
          />
        </View>
      </View>
    </>
  );
}

export default TodoItem;

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#5e0acc",
    padding: 12,
    marginVertical: 6,
    borderRadius: 6,
  },
  imageThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  todoText: {
    color: "white",
    padding: 16,
  },
  icon: {
    marginLeft: 10,
  },
});
