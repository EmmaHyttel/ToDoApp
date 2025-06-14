import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer, Button } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider } from "react-redux";

import { useState } from "react";
import { store } from "./store/redux/store";

import TodoListScreen from "./screenComponents/TodoListScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="To-do">
            {(props) => (
              <TodoListScreen
                {...props}
                items={courseGoals}
                setCourseGoals={setCourseGoals}
              />
            )}
          </Drawer.Screen>
        </Drawer.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}
