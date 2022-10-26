import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect, useContext } from "react";

const NoteContext = createContext();

const NoteProvider = ({ children }: any) => {
  const [notes, setNotes] = useState([]);
  const FindNotes = async () => {
    const result = await AsyncStorage.getItem("notes");
    if (result !== null) setNotes(JSON.parse(result));
  };

  useEffect(() => {
    // AsyncStorage.clear();
    FindNotes();
  }, []);

  return (
    <NoteContext.Provider value={{ notes, setNotes, FindNotes }}>
      {children}
    </NoteContext.Provider>
  );
};
export const useNotes = () => useContext<any>(NoteContext);
export default NoteProvider;
