import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";

import TodoListScreen from "./TodoListScreen";
import AddListModal from "../components/AddListModal";
import CustomDrawerContent from "../components/CustomDrawerContent";

const Drawer = createDrawerNavigator();

function NavigatorScreen() {
  const lists = useSelector((state) => state.lists.lists);
  const [courseGoals, setCourseGoals] = useState([]);
  const [addListModalVisible, setAddListModalVisible] = useState(false);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => (
          <CustomDrawerContent
            {...props}
            onAddList={() => setAddListModalVisible(true)}
          />
        )}
      >
        <Drawer.Screen
          name="To-do"
          key={1}
          component={TodoListScreen}
          initialParams={{ listId: 1 }}
        ></Drawer.Screen>
        {lists.map((list) => (
          <Drawer.Screen
            key={list.id}
            name={list.title}
            component={TodoListScreen}
            initialParams={{ listId: list.id }}
          />
        ))}
      </Drawer.Navigator>
      <AddListModal
        visible={addListModalVisible}
        onClose={() => setAddListModalVisible(false)}
      />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default NavigatorScreen;
