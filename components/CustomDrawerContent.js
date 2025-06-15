import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

export default function CustomDrawerContent({ onAddList, ...props }) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.separator} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onAddList}>
          <Text style={styles.buttonText}>Tilføj ny liste</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 12,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: "#5e0acc",
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#4b00a0",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
