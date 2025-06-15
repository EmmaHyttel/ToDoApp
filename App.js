import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider } from "react-redux";

import { useState } from "react";
import { store } from "./store/redux/store";

import TodoListScreen from "./screenComponents/TodoListScreen";
import AddListModal from "./components/AddListModal";
import CustomDrawerContent from "./components/CustomDrawerContent";

const Drawer = createDrawerNavigator();

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [addListModalVisible, setAddListModalVisible] = useState(false);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => (
            <CustomDrawerContent
              {...props}
              onAddList={() => setAddListModalVisible(true)}
            />
          )}
        >
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
        <AddListModal
          visible={addListModalVisible}
          onClose={() => setAddListModalVisible(false)}
        />
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}
