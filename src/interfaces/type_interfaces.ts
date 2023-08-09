type TypeOfStyle = "bolder" | "italic" | "line-through";
type ListTypes = "ul" | null;

interface WordsCustomize {
  word: string;
  word_index: number;
  chosen: boolean;
  bolder_style: TypeOfStyle | undefined;
  italic_style: TypeOfStyle | undefined;
  line_style: TypeOfStyle | undefined;
}

interface EachListNote {
  changes_modal_list: boolean;
  list_inner_text: string;
  list_styling: {
    chosen: boolean;
    bolder_style: TypeOfStyle | undefined;
    italic_style: TypeOfStyle | undefined;
    line_style: TypeOfStyle | undefined;
  };
}

interface NoteObj {
  note_title: string;
  selected: boolean;
  font: string | null;
  font_size: number;
  modalStatus: boolean;
  inner_note_text: string;
  styles_status: WordsCustomize[];
  list_type: ListTypes;
  list_status: boolean;
  list: EachListNote[];
  change_status: boolean;
}

interface RightSideProps {
  noteArray: NoteObj[];
  chosenIndex: number | null;
  setNoteArray: React.Dispatch<React.SetStateAction<NoteObj[]>>;
}

export type {
  NoteObj,
  TypeOfStyle,
  WordsCustomize,
  RightSideProps,
  ListTypes,
  EachListNote,
};
