import React from "react";
import { StyleSheet } from "react-native";
import { CheckBox, Icon, Button } from "react-native-elements";
import { ListItem } from "react-native-elements";
import { withTheme } from "react-native-elements";

const styles = StyleSheet.create({
  complete: {
    textDecorationLine: "line-through",
  },
});

const TodoItem = ({ title, id, complete, handleComplete, handleDelete, isAdmin, theme }) => (
  <ListItem key={id} bottomDivider>
    <CheckBox
      checked={complete}
      onPress={() => handleComplete(id, !complete)}
    />
    <ListItem.Content>
      <ListItem.Title style={complete ? styles.complete : ""}>
        {title}
      </ListItem.Title>
    </ListItem.Content>
    {isAdmin && (
      <Button
        onPress={() => handleDelete(id)}
        type="outline"
        disabled={!isAdmin}
        icon={<Icon name="delete" size={30} color={theme.colors.primary} />}
      />
    )}
  </ListItem>
);

export default withTheme(TodoItem);
