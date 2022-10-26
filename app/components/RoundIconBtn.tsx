import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../misc/colors";
interface Props {
  antIconName: string;
  size?: number;
  color?: string;
  style?: any;
  onPress?: () => void;
}
const RoundIconBtn: FC<Props> = ({
  antIconName,
  size,
  color,
  style,
  onPress,
}: any) => {
  return (
    <AntDesign
      name={antIconName}
      size={size || 24}
      color={color || colors.LIGHT}
      style={[styles.icon, { ...style }]}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: colors.PRIMARY,
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
});

export default RoundIconBtn;
