import { useRef } from "react";

// styles
import "./LeftSideSectionStyles.css";
//
// icons
import add_icon from "../../icons/4115237_add_plus_icon (1).png";
import selected_icon from "../../icons/8665872_star_favorite_icon.png";
//
// components
import { Button } from "./innerComponents/Button";
//
// interfaces
import { NoteObj } from "../../interfaces/type_interfaces";
//

interface LeftSideProps {
  setNoteArray: React.Dispatch<React.SetStateAction<NoteObj[]>>;
  noteArray: NoteObj[];
  setOpenCloserAddWindow: React.Dispatch<React.SetStateAction<boolean>>;
  openCloserAddWindow: boolean;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setChosenIndex: React.Dispatch<React.SetStateAction<number | null>>;
  chosenIndex: number | null;
}

export const LeftSide: React.FC<LeftSideProps> = ({
  setNoteArray,
  noteArray,
  setOpenCloserAddWindow,
  openCloserAddWindow,
  inputValue,
  setInputValue,
  setChosenIndex,
  chosenIndex,
}): JSX.Element => {
  const buffCopy = useRef<NoteObj[]>([]);

  function ArrayOfNotes() {
    if (inputValue !== "") {
      const newNote = {
        note_title: inputValue,
        selected: false,
        font: null,
        font_size: 15,
        modalStatus: false,
        inner_note_text:
          "# You can type here whatever you want, customize it ( choose 'Preview' mode to customize and 'Write' to write )",
        styles_status: [],
        list_type: null,
        list_status: false,
        list: [],
        change_status: false,
      };
      setNoteArray([...noteArray, newNote]);
    }
    setOpenCloserAddWindow(false);
    setInputValue("");
  }

  // set status of opened window
  function MoreButtonClicked(index: number) {
    // saving buff copy after opening more icon it was made for if person change data but push cancel button
    buffCopy.current = noteArray;
    //
    setNoteArray(
      noteArray.map((e: NoteObj, idx) => {
        if (idx === index) {
          return {
            ...e,
            modalStatus: true,
          };
        } else {
          return e;
        }
      })
    );
  }

  // text changer
  function ChangingInputedTitle(changedText: string, index: number) {
    setNoteArray(
      noteArray.map((e: NoteObj, idx) => {
        if (idx === index) {
          return {
            ...e,
            note_title: changedText,
          };
        }
        return e;
      })
    );
  }

  function SaveChanges(index: number) {
    setNoteArray(
      noteArray.map((e: NoteObj, idx) => {
        if (idx === index) {
          return {
            ...e,
            modalStatus: false,
          };
        } else {
          return e;
        }
      })
    );
  }

  function NotesDeleter(index: number) {
    if (index === chosenIndex && noteArray.length - 1 > 0) {
      setChosenIndex(0);
      setNoteArray(noteArray.filter((_, idx) => index !== idx));
    } else if (index !== chosenIndex && noteArray.length - 1 > 0) {
      setChosenIndex(0);
      setNoteArray(noteArray.filter((_, idx) => index !== idx));
    } else {
      setChosenIndex(null);
      setNoteArray(noteArray.filter((_, idx) => index !== idx));
    }
  }

  function AddingNoteToSelected(noteIdx: number, note: NoteObj) {
    if (note.selected) {
      noteArray[noteIdx].selected = false;
    } else {
      noteArray[noteIdx].selected = true;
    }
    const selectedNotes: NoteObj[] = [];
    const notSelectedNotes: NoteObj[] = [];
    noteArray.forEach((e) => {
      if (e.selected) {
        selectedNotes.push(e);
      } else {
        notSelectedNotes.push(e);
      }
    });
    setNoteArray([...selectedNotes, ...notSelectedNotes]);
  }

  return (
    <section className="left-side-section">
      <div className="left-side-wrapper">
        <div className="left-side-header-wrapper">
          <header className="left-side-header">
            <div className="note-header">
              <h1>NotesBin</h1>
            </div>
            <div className="add-note">
              <button onClick={() => setOpenCloserAddWindow(true)}>
                <img src={add_icon} alt="add" width={20}></img>
              </button>
            </div>
          </header>
        </div>

        <div className="inner-notes-data-wrapper">
          {openCloserAddWindow && (
            <div className="notes-adder">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Add note title here"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  id="note-title"
                />
              </div>
              <div className="save-cancel-block-wrapper">
                <div className="cancel-button">
                  <button
                    className="cancel"
                    onClick={() => setOpenCloserAddWindow(false)}
                  >
                    Cancel
                  </button>
                </div>
                <div className="save-button">
                  <button className="save" onClick={() => ArrayOfNotes()}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="notes-bin-wrapper">
            <>
              {noteArray.length !== 0 ? (
                <>
                  {noteArray.map((e, index) => {
                    return (
                      <>
                        {e.modalStatus ? (
                          <div className="notes-title-changer-wrapper">
                            <div className="notes-title-changer">
                              <div className="notes-adder">
                                <div className="input-wrapper">
                                  <input
                                    type="text"
                                    placeholder="Change note title here"
                                    value={e.note_title}
                                    onChange={(e) =>
                                      ChangingInputedTitle(
                                        e.target.value,
                                        index
                                      )
                                    }
                                    id="change-note-title"
                                  />
                                </div>
                                <div className="save-cancel-block-wrapper">
                                  <div className="delete-button">
                                    <button
                                      className="cancel"
                                      onClick={() => NotesDeleter(index)}
                                    >
                                      Delete
                                    </button>
                                  </div>

                                  <div className="cancel-button">
                                    <button
                                      className="cancel"
                                      onClick={() => {
                                        setNoteArray(
                                          buffCopy.current.map((e, idx) => {
                                            if (idx === index) {
                                              return {
                                                ...e,
                                                modalStatus: false,
                                              };
                                            }
                                            return e;
                                          })
                                        );
                                      }}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                  <div className="save-button">
                                    <button
                                      className="save"
                                      onClick={() => SaveChanges(index)}
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="note-wrapper"
                            key={index}
                            onClick={() => setChosenIndex(index)}
                          >
                            <div className="note-text">{e.note_title}</div>
                            <div className="more-icon-wrapper">
                              <div
                                className={
                                  e.selected
                                    ? "selected-wrapper"
                                    : "not-selected-wrapper"
                                }
                                title="Add note to favourite"
                                onClick={() => AddingNoteToSelected(index, e)}
                              >
                                <img
                                  src={selected_icon}
                                  alt="selected"
                                  width={22}
                                />
                              </div>
                              <Button
                                index={index}
                                getIndex={MoreButtonClicked}
                              ></Button>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })}
                </>
              ) : (
                <div className="warning-field-text">NoteBin is empty...</div>
              )}
            </>
          </div>
        </div>
      </div>
    </section>
  );
};
