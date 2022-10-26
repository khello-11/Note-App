import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { FC } from "react";
import colors from "../misc/colors";
import { AntDesign } from "@expo/vector-icons";
interface styleProp {
  containerStyle?: {};
  value?: any;
  onClear?: any;
  onChangeText?: any;
}
const SearchBar: FC<styleProp> = ({
  value,
  onClear,
  onChangeText,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, { ...containerStyle }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.searchBar}
        placeholder=" Search Here"
      />
      {value ? (
        <AntDesign
          name="close"
          size={20}
          color={colors.PRIMARY}
          onPress={onClear}
          style={styles.clearIcon}
        />
      ) : null}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    height: 40,
    borderRadius: 40,
    fontSize: 20,
    padding: 11,
  },
  container: {
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  clearIcon: {
    position: "absolute",
    right: 25,
    top: 10,
  },
});
