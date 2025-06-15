import "react-native-gesture-handler";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider } from "react-redux";

import { store } from "./store/redux/store";

import NavigatorScreen from "./screenComponents/NavigatorScreen";



export default function App() {
  return <Provider store={store}>
    <NavigatorScreen/>
  </Provider>;
}
