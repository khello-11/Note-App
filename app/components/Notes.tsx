import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC } from "react";
import colors from "../misc/colors";
import RoundIconBtn from "./RoundIconBtn";
interface proprenderItem {
  item: { title: string; desc: string };
  onPress: () => void;
}
const Notes: FC<proprenderItem> = ({ onPress, item }) => {
  const { title, desc } = item;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
      <Text numberOfLines={3}>{item.desc}</Text>
    </TouchableOpacity>
  );
};

export default Notes;
const width = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY,
    width: width / 2 - 10,
    padding: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.LIGHT,
  },
});
