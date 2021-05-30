import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon, Text } from "react-native-elements";
import { ListItem } from "react-native-elements";
import { FAB } from "react-native-elements";
import { withTheme } from "react-native-elements";
import TodoItem from "./TodoItem";

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  complete: {
    textDecorationLine: "line-through",
  },
  loading: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Todos = ({
  todos,
  loaded,
  isAdmin,
  onAddClick,
  handleComplete,
  handleDelete,
  theme,
}) => (
  <View style={styles.container}>
    {loaded ? (
      <>
        {!todos.length && (
          <ListItem>
            <ListItem.Content>
              <ListItem.Title>{`No Todos.${
                isAdmin ? " Click Add to create one." : ""
              }`}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        )}
        {todos.map(({ title, id, complete }) => (
          <TodoItem
            key={id}
            title={title}
            id={id}
            complete={complete}
            isAdmin={isAdmin}
            handleComplete={handleComplete}
            handleDelete={handleDelete}
          />
        ))}
        {isAdmin && (
          <FAB
            placement="right"
            title="Add"
            color={theme.colors.primary}
            icon={<Icon name="add" size={30} color="white" />}
            onPress={onAddClick}
          />
        )}
      </>
    ) : (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    )}
  </View>
);

export default withTheme(Todos);
