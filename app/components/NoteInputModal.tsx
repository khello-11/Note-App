import {
  StyleSheet,
  Text,
  View,
  Modal,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, FC, useEffect } from "react";
import colors from "../misc/colors";
import RoundIconBtn from "./RoundIconBtn";
import { DefaultTypes } from "react-native/Libraries/Types/CodegenTypes";

interface props {
  visible: boolean;
  onClose: () => void;
  onSubmit?:any;
  note?: any;
  isEdit?: boolean;
}

const NoteInputModal: FC<props> = ({
  visible,
  onClose,
  onSubmit,
  note,
  isEdit,
}) => {
  const [title, setTitle] = useState<string>("");

  const [desc, setDesc] = useState<string>("");

  useEffect(() => {
    if (isEdit) {
      setTitle(note.title);
      setDesc(note.desc);
    }
  }, [isEdit]);
  // a function to hide the keyboard!!
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  // a function to store the value in the useState for Title and Desc
  const handleOnChangeText = (text: string, ValueFor: string) => {
    if (ValueFor === "title") setTitle(text);
    if (ValueFor === "desc") setDesc(text);
  };

  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();

    if (isEdit) {
      // for editing and saving(
      onSubmit(title, desc, Date.now());
    } else {
      onSubmit(title, desc);
      setTitle("");
      setDesc("");
    }

    onClose();
  };
  const handleClose = () => {
    if (!isEdit) {
      setTitle("");
      setDesc("");
    }

    onClose();
  };

  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType="fade">
        <View style={styles.container}>
          <TextInput
            value={title}
            onChangeText={text => handleOnChangeText(text, "title")}
            placeholder="Title"
            style={[styles.input, styles.title]}
          />
          <TextInput
            value={desc}
            onChangeText={text => handleOnChangeText(text, "desc")}
            placeholder="Note"
            multiline
            style={[styles.input, styles.desc]}
          />
          <View style={styles.btnContainer}>
            <RoundIconBtn
              size={15}
              antIconName="check"
              onPress={handleSubmit}
            />

            {title.trim() || desc.trim() ? (
              <RoundIconBtn
                size={15}
                style={{ marginLeft: 15 }}
                antIconName="close"
                onPress={handleClose}
              />
            ) : null}
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default NoteInputModal;

const styles = StyleSheet.create({
  container: {
    top: 50,
    paddingHorizontal: 20,
    paddingTop: 15,
    fontSize: 30,
  },
  title: {
    height: 40,
    marginBottom: 10,
    fontWeight: "bold",
    color: colors.PRIMARY,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    color: colors.PRIMARY,
  },
  desc: {
    height: 100,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
    // backgroundColor: "red",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 15,
  },
});
