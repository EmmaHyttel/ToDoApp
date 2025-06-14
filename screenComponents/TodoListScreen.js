import { useState } from "react";
import { View, StyleSheet, FlatList, Button } from "react-native";

import { useSelector } from "react-redux";

import TodoItem from "../components/TodoItem";
import AddTodoModal from "../components/AddTodoModal";
import TodoItemModal from "../components/TodoItemModal";

import "react-native-get-random-values";

function TodoListScreen() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [editModalIsVisible, setEditModalIsVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const items = useSelector((state) => state.todos.todos);

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
    </View>
  );
}

export default TodoListScreen;

const styles = StyleSheet.create({
  goalsContainer: {
    flex: 4,
  },
  container: {
    flex: 1,
    padding: 16,
  },
});
