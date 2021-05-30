import React from "react";
import { View, StyleSheet } from "react-native";
import { Input, Icon } from "react-native-elements";
import { FAB } from "react-native-elements";
import { withTheme } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

const AddTodo = ({ theme, onCreate, title, setTitle }) => {
  return (
    <View style={styles.container}>
      <Input
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      <FAB
        placement="right"
        title="Create"
        color={theme.colors.primary}
        icon={<Icon name="add" size={30} color="white" />}
        onPress={onCreate}
      />
    </View>
  );
};

export default withTheme(AddTodo);
