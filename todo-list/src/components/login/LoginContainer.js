import React from "react";
import { useState } from "react";
import Constants from "expo-constants";
import Login from "./Login";

const LoginContainer = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = async () => {
    setError(false);
    const res = await fetch(`${Constants.manifest.apiUrl}/login`, {
      method: "POST",
      body: JSON.stringify({ login, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status !== 200) {
      setError(true);
    } else {
      const { type: user } = await res.json();
      setLogin("");
      setPassword("");
      navigation.navigate("Todos", { user });
    }
  };

  return (
    <Login
      error={error}
      login={login}
      setLogin={setLogin}
      password={password}
      setPassword={setPassword}
      handleLogin={onSubmit}
    />
  );
};

export default LoginContainer;
