import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "react-native-elements";
import Login from "./login";
import Todos from "./todos";
import AddTodo from "./add-todo";

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Navigator>
          <Screen name="Login" component={Login} options={{ title: "Login" }} />
          <Screen
            name="Todos"
            component={Todos}
            options={{ title: "Todo List" }}
          />
          <Screen
            name="AddTodo"
            component={AddTodo}
            options={{ title: "Add Todo" }}
          />
        </Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
