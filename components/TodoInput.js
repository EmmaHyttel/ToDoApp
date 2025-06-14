import { View, TextInput, StyleSheet } from "react-native";

function TodoInput({ value, onChangeText }) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Tilføj todo"
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}

export default TodoInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  textInput: {
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
});
