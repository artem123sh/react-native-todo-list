import React, { useEffect, useMemo, useState } from "react";
import Constants from "expo-constants";
import { checkIfAuthorized } from "../utils/http";
import Todos from "./Todos";

const TodosContainer = ({ route, navigation }) => {
  const [todos, setTodos] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { user, id: createdTodoId } = route.params;
  const isAdmin = useMemo(() => user === "admin", [user]);

  const getTodos = async () => {
    setLoaded(false);
    const res = await fetch(`${Constants.manifest.apiUrl}/todos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    try {
      checkIfAuthorized(res);
      const todos = await res.json();
      setTodos(todos);
      setLoaded(true);
    } catch (e) {
      navigation.navigate("Login");
    }
  };

  useEffect(() => {
    getTodos();
  }, [createdTodoId]);

  const handleComplete = async (id, complete) => {
    const res = await fetch(`${Constants.manifest.apiUrl}/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ complete }),
    });
    try {
      checkIfAuthorized(res);
      getTodos();
    } catch (e) {
      navigation.navigate("Login");
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`${Constants.manifest.apiUrl}/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    try {
      checkIfAuthorized(res);
      getTodos();
    } catch (e) {
      navigation.navigate("Login");
    }
  };

  return (
    <Todos
      todos={todos}
      loaded={loaded}
      isAdmin={isAdmin}
      onAddClick={() => navigation.navigate("AddTodo")}
      handleComplete={handleComplete}
      handleDelete={handleDelete}
    />
  );
};

export default TodosContainer;
