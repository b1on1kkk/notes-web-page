import React from "react";
import { useState } from "react";
import "./App.css";

import { LeftSide } from "./components/AllNotesSideSection/LeftSideSection";
import { RigthSide } from "./components/NotesChangerSection/RightSideSection";

import { NoteObj } from "./interfaces/type_interfaces";

function App() {
  const [openCloserAddWindow, setOpenCloserAddWindow] =
    useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [noteArray, setNoteArray] = useState<NoteObj[]>([]);

  const [chosenIndex, setChosenIndex] = useState<number | null>(null);

  return (
    <div className="App">
      <LeftSide
        setNoteArray={setNoteArray}
        noteArray={noteArray}
        setOpenCloserAddWindow={setOpenCloserAddWindow}
        openCloserAddWindow={openCloserAddWindow}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setChosenIndex={setChosenIndex}
        chosenIndex={chosenIndex}
      ></LeftSide>
      <RigthSide
        noteArray={noteArray}
        chosenIndex={chosenIndex}
        setNoteArray={setNoteArray}
      ></RigthSide>
    </div>
  );
}

export default App;
