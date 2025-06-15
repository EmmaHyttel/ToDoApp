import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { View, StyleSheet, FlatList, Button } from "react-native";

import { useSelector } from "react-redux";

import TodoItem from "../components/TodoItem";
import AddTodoModal from "../components/AddTodoModal";
import TodoItemModal from "../components/TodoItemModal";
import MyIconButton from "../components/MyIconButton";

import "react-native-get-random-values";

function TodoListScreen(props) {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [editModalIsVisible, setEditModalIsVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const route = useRoute();

  const { listId } = route.params || 1;

  const items = useSelector((state) =>
    state.todos.todos.filter((todo) => todo.listId === listId)
  );

  function startAddTodoHandler() {
    setModalIsVisible(true);
  }

  function endAddTodoHandler() {
    setModalIsVisible(false);
  }

  function openEditModal(item) {
    setEditModalIsVisible(true);
    setSelectedTodo(item);
  }

  function closeEditModal() {
    setEditModalIsVisible(false);
    setSelectedTodo(null);
  }

  function renderTodoItem(itemData) {
    const item = itemData.item;

    console.log(item);
    return (
      <TodoItem
        id={item.id}
        text={item.text}
        image={item.image}
        completed={item.completed}
        openEditModal={() => openEditModal(item)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Tilføj to-do" onPress={startAddTodoHandler} />

      <AddTodoModal
        modalIsVisible={modalIsVisible}
        onCancel={endAddTodoHandler}
        selectedListId={listId}
      />
      {selectedTodo && (
        <TodoItemModal
          visible={editModalIsVisible}
          onClose={closeEditModal}
          todo={selectedTodo}
          onDelete={() => {
            closeEditModal();
          }}
        />
      )}
      <View style={styles.goalsContainer}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderTodoItem}
          alwaysBounceVertical={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <MyIconButton
          icon="add"
          size={32}
          onPress={startAddTodoHandler}
          style={{ position: "absolute", bottom: 16, right: 16 }}
        />
      </View>
    </View>
  );
}

export default TodoListScreen;

const styles = StyleSheet.create({
  goalsContainer: {
    flex: 4,
    paddingBottom: 80,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
  },
});
