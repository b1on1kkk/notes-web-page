import { NoteObj, WordsCustomize } from "../../../interfaces/type_interfaces";

export default function WordStatusSetter(
  notesSetter: React.Dispatch<React.SetStateAction<NoteObj[]>>,
  noteArray: NoteObj[],
  chosenIndex: number,
  bolderStylerSetter: React.Dispatch<React.SetStateAction<boolean>>,
  italicStylerSetter: React.Dispatch<React.SetStateAction<boolean>>,
  lineThroughtSetter: React.Dispatch<React.SetStateAction<boolean>>,
  chosenWords: WordsCustomize[]
) {
  notesSetter(
    noteArray.map((e, idx) => {
      if (idx === chosenIndex) {
        e.styles_status.map((innerElement) => {
          for (let i = 0; i < chosenWords.length; i++) {
            if (innerElement.word_index === chosenWords[i].word_index) {
              if (innerElement.bolder_style !== undefined) {
                bolderStylerSetter(true);
              }
              if (innerElement.italic_style !== undefined) {
                italicStylerSetter(true);
              }
              if (innerElement.line_style !== undefined) {
                lineThroughtSetter(true);
              }

              innerElement.chosen = true;
              break;
            }
          }
          return innerElement;
        });
      }
      return e;
    })
  );
}
