import React, { useState } from "react";
import Constants from "expo-constants";
import AddTodo from "./AddTodo";
import { checkIfAuthorized } from "../utils/http";

const AddTodoContainer = ({ navigation }) => {
  const [title, setTitle] = useState("");

  const onCreate = async () => {
    const res = await fetch(`${Constants.manifest.apiUrl}/todos`, {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    try {
      checkIfAuthorized(res);
      const { id } = await res.json();
      setTitle("");
      navigation.navigate("Todos", { id });
    } catch (e) {
      navigation.navigate("Login");
    }
  };

  return <AddTodo onCreate={onCreate} title={title} setTitle={setTitle} />;
};

export default AddTodoContainer;
