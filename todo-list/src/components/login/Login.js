import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
  },
  button: {
    width: 400,
    height: 50,
    marginBottom: 150,
  },
  error: {
    color: "red",
  },
});

const invalidLoginMessage = "Login or Password are invalid";

const Login = ({ error, login, setLogin, password, setPassword, handleLogin }) => (
  <View style={styles.container}>
    <Input
      value={login}
      onChangeText={setLogin}
      placeholder="Login"
      errorStyle={styles.error}
      errorMessage={error && invalidLoginMessage}
    />
    <Input
      value={password}
      onChangeText={setPassword}
      placeholder="Password"
      secureTextEntry={true}
      errorStyle={styles.error}
      errorMessage={error && invalidLoginMessage}
    />
    <Button buttonStyle={styles.button} onPress={handleLogin} title={"Login"} />
  </View>
);

export default Login;
