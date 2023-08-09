import { useState, useEffect, useRef } from "react";

import "./RightSideSectionStyles.css";

import { MDBSpinner } from "mdb-react-ui-kit";

// icons
import font_icon from "../../icons/8665315_f_alphabet_icon.png";
import bold_icon from "../../icons/8664977_b_letter_icon.png";
import italic_icon from "../../icons/8665466_i_information_icon.png";
import cross from "../../icons/2931142_minimize_minus_remove_line_icon.png";
import p_letter from "../../icons/8665781_p_alphabet_icon.png";
import save_to_clipboard_icon from "../../icons/8665411_file_arrow_down_icon.png";
import saved_to_clipboard_icon from "../../icons/8665348_clipboard_check_icon.png";
import ul_list from "../../icons/8665703_list_ul_icon.png";
import add_list_note from "../../icons/8665223_circle_plus_icon.png";
import upload_changes from "../../icons/8665201_circle_check_icon.png";
import text_size_icon from "../../icons/8665862_sliders_icon.png";
import inner_data_changer from "../../icons/8665635_pencil_write_icon.png";
import trash_icon from "../../icons/8665900_trash_can_icon.png";
import dots_icon from "../../icons/8665344_ellipsis_icon.png";
//

import {
  TypeOfStyle,
  WordsCustomize,
  RightSideProps,
  ListTypes,
  EachListNote,
} from "../../interfaces/type_interfaces";

import WordStatusSetter from "./utilities/WordStatusSetter";

import { Button } from "../AllNotesSideSection/innerComponents/Button";

type WordOrWordList = "word" | "word_list";

export const RigthSide: React.FC<RightSideProps> = ({
  noteArray,
  chosenIndex,
  setNoteArray,
}): JSX.Element => {
  const [saveToClipBoard, setSaveToClipBoard] = useState<boolean>(false);
  const [textAreaData, setTextAreaData] = useState<string>("");

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const textAreaStatus = useRef(null);

  // styles variable status
  const [bolder, setBolder] = useState<boolean>(false);
  const [italic, setItalic] = useState<boolean>(false);
  const [lineThrough, setLineThrough] = useState<boolean>(false);
  //
  const chosenWords = useRef<WordsCustomize[]>([]);

  // modal window
  const [darkerStatus, setDarkerStatus] = useState<boolean>(false);

  const [listTasksAdder, setListTasksAdder] = useState<boolean>(false);

  const [inputModalValue, setInputModalValue] = useState<string>("");

  const listNotesArray = useRef<EachListNote[]>([]);
  const copyOfTitleList = useRef<string>("");
  const chosenListWords = useRef<EachListNote[]>([]);
  //

  const [fontStylesWindowStatus, setFontStylesWindowStatus] =
    useState<boolean>(false);
  const [mobileFontStylesWindowStatus, setMobileFontStylesWindowStatus] =
    useState<boolean>(false);
  const [fonts, setFonts] = useState<{ font: string }[]>([]);
  const [spinnerStatus, setSpinnerStatus] = useState<boolean>(true);

  const [rangeModalStatus, setRangeModalStatus] = useState<boolean>(false);
  const [rangeModalMobileStatus, setRangeModalMobileStatus] =
    useState<boolean>(false);
  const [modalMobileWinStatus, setModalMobileWinStatus] =
    useState<boolean>(false);

  useEffect(() => {
    if (chosenIndex !== null) {
      setTextAreaData(noteArray[chosenIndex].inner_note_text);
    }
  }, [chosenIndex, noteArray]);

  function SettingNoteFunction(note: string) {
    setTextAreaData(note);
    setNoteArray(
      noteArray.map((e, idx) => {
        if (idx === chosenIndex) {
          return {
            ...e,
            inner_note_text: note,
            styles_status: note.split(" ").map((e, index) => {
              return {
                word_index: index,
                word: e,
                chosen: false,
                bolder_style: undefined,
                italic_style: undefined,
                line_style: undefined,
              };
            }),
          };
        }
        return e;
      })
    );
  }

  // splitting person's entered string
  useEffect(() => {
    if (chosenIndex !== null) {
      if (noteArray[chosenIndex].styles_status.length === 0) {
        setNoteArray(
          noteArray.map((e, index) => {
            if (index === chosenIndex) {
              return {
                ...e,
                styles_status: noteArray[chosenIndex].inner_note_text
                  .split(" ")
                  .map((e, index) => {
                    return {
                      word_index: index,
                      word: e,
                      chosen: false,
                      bolder_style: undefined,
                      italic_style: undefined,
                      line_style: undefined,
                    };
                  }),
              };
            }
            return e;
          })
        );
      }
    }
  }, [setNoteArray, chosenIndex, noteArray]);
  //

  function ChooseToCustomize(chosenWord: WordsCustomize, checker: boolean) {
    if (checker) {
      chosenWords.current = [...chosenWords.current, chosenWord];

      WordStatusSetter(
        setNoteArray,
        noteArray,
        chosenIndex!,
        setBolder,
        setItalic,
        setLineThrough,
        chosenWords.current
      );
    } else {
      setBolder(false);
      setItalic(false);
      setLineThrough(false);

      chosenWords.current = chosenWords.current.filter((e) => {
        if (e.word_index === chosenWord.word_index) {
          e.chosen = false;
          return 0;
        }
        return e;
      });

      if (chosenWords.current.length > 0) {
        WordStatusSetter(
          setNoteArray,
          noteArray,
          chosenIndex!,
          setBolder,
          setItalic,
          setLineThrough,
          chosenWords.current
        );
      } else {
        setNoteArray([...noteArray]);
      }
    }
  }

  function SettingTextStyles<K extends keyof WordsCustomize>(
    key: K,
    typeOfInitializing: TypeOfStyle | undefined,
    type: WordOrWordList
  ) {
    // clear chosen list words array
    chosenListWords.current = [];
    //

    if (type === "word") {
      chosenWords.current = [];

      setNoteArray(
        noteArray.map((e, idx) => {
          if (idx === chosenIndex) {
            e.styles_status.map((e) => {
              if (e.chosen) {
                setBolder(false);
                setItalic(false);
                setLineThrough(false);
                return Object.assign(e, {
                  ...e,
                  chosen: false,
                  [key]: typeOfInitializing,
                });
              }
              return e;
            });
          }
          return e;
        })
      );
    } else {
      noteArray[chosenIndex!].list.map((e) => {
        if (e.list_styling.chosen) {
          setBolder(false);
          setItalic(false);
          setLineThrough(false);
          return Object.assign(e.list_styling, {
            ...e.list_styling,
            chosen: false,
            [key]: typeOfInitializing,
          });
        }
        return e;
      });

      setNoteArray([...noteArray]);
    }
  }

  function CreateModalListsWin(list_type: ListTypes) {
    noteArray[chosenIndex!].list_type = list_type;
    setNoteArray([...noteArray]);
  }

  function AddingListNotes(checkerToAdd: boolean, textValue?: string) {
    if (checkerToAdd && textValue) {
      listNotesArray.current = [
        ...listNotesArray.current,
        {
          list_inner_text: textValue,
          changes_modal_list: false,
          list_styling: {
            chosen: false,
            bolder_style: undefined,
            italic_style: undefined,
            line_style: undefined,
          },
        },
      ];
    }

    setNoteArray(
      noteArray.map((e, idx) => {
        if (idx === chosenIndex) {
          return {
            ...e,
            list: listNotesArray.current,
          };
        }
        return e;
      })
    );
  }

  function SettingModalStatusChanges(index: number) {
    copyOfTitleList.current = listNotesArray.current[index].list_inner_text;
    setNoteArray(
      noteArray.map((e, idx) => {
        if (idx === chosenIndex) {
          e.list[index].changes_modal_list = true;
          return e;
        }
        return e;
      })
    );
  }

  function ChangeInputListTitle(newValue: string, index: number) {
    setNoteArray(
      noteArray.map((e, idx) => {
        if (idx === chosenIndex) {
          e.list[index].list_inner_text = newValue;
          return e;
        }
        return e;
      })
    );
  }

  function CancelChanges(index: number) {
    setNoteArray(
      noteArray.map((e, idx) => {
        if (idx === chosenIndex) {
          e.list[index].list_inner_text = copyOfTitleList.current;
          e.list[index].changes_modal_list = false;
          return e;
        }
        return e;
      })
    );
  }

  function SaveModalListChanges(index: number) {
    setNoteArray(
      noteArray.map((e, idx) => {
        if (idx === chosenIndex) {
          e.list[index].changes_modal_list = false;
          return e;
        }
        return e;
      })
    );
  }

  function DeleterModalList(index: number) {
    listNotesArray.current = listNotesArray.current.filter(
      (_, idx) => index !== idx
    );
    AddingListNotes(false);
  }

  function ChosenToCustomizeList(chosenWord: EachListNote, checker: boolean) {
    if (checker) {
      // adding new chosen word to mass
      chosenListWords.current = [...chosenListWords.current, chosenWord];

      noteArray[chosenIndex!].list.map((e) => {
        for (let i = 0; i < chosenListWords.current.length; i++) {
          if (
            e.list_inner_text === chosenListWords.current[i].list_inner_text
          ) {
            if (e.list_styling.bolder_style !== undefined) {
              setBolder(true);
            }
            if (e.list_styling.italic_style !== undefined) {
              setItalic(true);
            }
            if (e.list_styling.line_style !== undefined) {
              setLineThrough(true);
            }

            e.list_styling.chosen = true;
            break;
          }
        }
        return { ...e };
      });

      setNoteArray([...noteArray]);
    } else {
      setBolder(false);
      setItalic(false);
      setLineThrough(false);

      // remove if word chosen twice
      chosenListWords.current = chosenListWords.current.filter((e) => {
        if (e.list_inner_text === chosenWord.list_inner_text) {
          e.list_styling.chosen = false;
          return 0;
        }
        return e;
      });

      setNoteArray([...noteArray]);
    }
  }

  function StyleSetterFunction(
    typeOfInitializing: TypeOfStyle | undefined,
    key: keyof WordsCustomize
  ) {
    if (chosenIndex !== null) {
      // if "chosen" is true value (no matter how many) call function for table styles
      if (
        noteArray[chosenIndex!].list.some(
          (val) => val.list_styling.chosen === true
        )
      ) {
        SettingTextStyles(key, typeOfInitializing, "word_list");
      } else {
        SettingTextStyles(key, typeOfInitializing, "word");
      }
    }
  }

  function SaveToClipBoardHandler() {
    navigator.clipboard.writeText(noteArray[chosenIndex!].inner_note_text);
  }

  function FontSetter(
    status: boolean,
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    if (fonts.length === 0) {
      fetch("https://api.jsonbin.io/v3/b/64a9ad758e4aa6225ebb277f")
        .then((response) => response.json())
        .then((data) => setFonts(data.record))
        .catch((err) => console.error(err))
        .finally(() => setSpinnerStatus(false));
    }

    setter(status);
  }

  console.log(noteArray);

  return (
    <section className="right-side-section">
      <div className="header-wrapper">
        <header>
          <>
            <div
              className="disabled-wrapper"
              style={
                noteArray.length !== 0 && chosenIndex !== null
                  ? {}
                  : { position: "relative", zIndex: -1, opacity: 0.5 }
              }
            >
              <div className="header-top">
                <div className="preview-write-buttons-block">
                  <div className="write-button">
                    <span
                      style={
                        isFocused
                          ? { border: "1px solid rgba(0, 0, 0, 0.2)" }
                          : {}
                      }
                      onClick={() => setIsFocused(true)}
                    >
                      Write
                    </span>
                  </div>
                  <div className="preview-button">
                    <span
                      style={
                        isFocused
                          ? {}
                          : { border: "1px solid rgba(0, 0, 0, 0.2)" }
                      }
                      onClick={() => setIsFocused(false)}
                    >
                      Preview
                    </span>
                  </div>
                </div>

                <div className="fonts-wrapper">
                  <div className="font-working-block">
                    <div
                      className="font-style-changer"
                      onClick={
                        fontStylesWindowStatus
                          ? () => FontSetter(false, setFontStylesWindowStatus)
                          : () => FontSetter(true, setFontStylesWindowStatus)
                      }
                      style={
                        fontStylesWindowStatus
                          ? { border: "1px solid rgba(0, 0, 0, 0.2)" }
                          : {}
                      }
                    >
                      <img src={font_icon} alt="font-family" width={20}></img>
                    </div>
                    <>
                      {fontStylesWindowStatus && (
                        <div
                          className="font-family-dropdown-wrapper"
                          style={
                            spinnerStatus
                              ? {
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }
                              : {}
                          }
                        >
                          {spinnerStatus ? (
                            <MDBSpinner role="status">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </MDBSpinner>
                          ) : (
                            <>
                              {fonts.map((e, idx) => {
                                return (
                                  <div
                                    className="font-family-wrapper"
                                    key={idx}
                                    onClick={() => {
                                      noteArray[chosenIndex!].font = e.font;
                                      setFontStylesWindowStatus(false);
                                    }}
                                    style={{ fontFamily: e.font }}
                                  >
                                    {e.font}
                                  </div>
                                );
                              })}
                            </>
                          )}
                        </div>
                      )}
                    </>
                    <div
                      className="font-style-changer"
                      style={
                        bolder ? { border: "1px solid rgba(0, 0, 0, 0.2)" } : {}
                      }
                      onClick={() => {
                        if (bolder) {
                          StyleSetterFunction(undefined, "bolder_style");
                        } else {
                          StyleSetterFunction("bolder", "bolder_style");
                        }
                      }}
                    >
                      <img src={bold_icon} alt="bolder" width={20} />
                    </div>
                    <div
                      className="font-style-changer"
                      style={
                        italic ? { border: "1px solid rgba(0, 0, 0, 0.2)" } : {}
                      }
                      onClick={() => {
                        if (italic) {
                          StyleSetterFunction(undefined, "italic_style");
                        } else {
                          StyleSetterFunction("italic", "italic_style");
                        }
                      }}
                    >
                      <img src={italic_icon} alt="italic-font" width={20} />
                    </div>
                    <div
                      className="font-style-changer"
                      style={
                        lineThrough
                          ? { border: "1px solid rgba(0, 0, 0, 0.2)" }
                          : {}
                      }
                      onClick={() => {
                        if (lineThrough) {
                          StyleSetterFunction(undefined, "line_style");
                        } else {
                          StyleSetterFunction("line-through", "line_style");
                        }
                      }}
                    >
                      <img src={p_letter} alt="italic-font" width={20} />
                      <div className="cross-letter">
                        <img src={cross} alt="cross" width={20} />
                      </div>
                    </div>
                    <div className="font-style-changer">
                      <img
                        src={text_size_icon}
                        alt="text-size"
                        width={20}
                        onClick={
                          rangeModalStatus
                            ? () => setRangeModalStatus(false)
                            : () => setRangeModalStatus(true)
                        }
                      />

                      {rangeModalStatus && (
                        <div className="modal-range-window">
                          <div className="modal-range-title-wrapper">
                            <h1>Set text size</h1>
                          </div>
                          <div className="input-wrapper">
                            <span>1px</span>
                            <div>
                              <input
                                value={noteArray[chosenIndex!].font_size}
                                type="range"
                                min={1}
                                max={30}
                                onChange={(e) => {
                                  noteArray[chosenIndex!].font_size = parseInt(
                                    e.target.value
                                  );
                                  setNoteArray([...noteArray]);
                                }}
                              />
                            </div>

                            <span>30px</span>
                          </div>
                          <div className="total-size">
                            <span>
                              Font size: {noteArray[chosenIndex!].font_size}px
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div
                      className="mobile-settings"
                      onClick={
                        modalMobileWinStatus
                          ? () => setModalMobileWinStatus(false)
                          : () => setModalMobileWinStatus(true)
                      }
                    >
                      <div className="font-style-changer-mobile">
                        <img src={dots_icon} alt="open more" width={20} />
                      </div>
                    </div>
                  </div>

                  <div className="another-working-with-text-block">
                    <div
                      className="font-style-changer"
                      onClick={SaveToClipBoardHandler}
                    >
                      {saveToClipBoard ? (
                        <div className="saved">
                          <img
                            src={saved_to_clipboard_icon}
                            alt="saved"
                            width={20}
                          />
                          <div>Saved to clipboard!</div>
                        </div>
                      ) : (
                        <img
                          src={save_to_clipboard_icon}
                          alt="save-to-clipboard"
                          width={20}
                          className="save-to-clipboard-styles"
                          onClick={() => {
                            setTimeout(() => {
                              setSaveToClipBoard(false);
                            }, 2000);
                            setSaveToClipBoard(true);
                          }}
                        ></img>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <>
                {chosenIndex !== null && (
                  <div className="header-button">
                    <div
                      className="type-of-list"
                      style={
                        noteArray[chosenIndex].list_status
                          ? { position: "relative", zIndex: -1, opacity: 0.5 }
                          : {}
                      }
                    >
                      <div
                        className="font-style-changer"
                        onClick={() => {
                          setDarkerStatus(true);
                          CreateModalListsWin("ul");
                        }}
                      >
                        <img src={ul_list} alt="italic-font" width={20} />
                      </div>
                    </div>
                  </div>
                )}
              </>
            </div>
          </>
        </header>
      </div>
      {/* person text and perosn ul list */}
      <>
        {chosenIndex !== null ? (
          <div
            className="text-data-wrapper"
            onBlur={() => setIsFocused(false)}
            style={
              noteArray[chosenIndex].font !== null
                ? { fontFamily: `${noteArray[chosenIndex].font}` }
                : {}
            }
            id="text"
          >
            {isFocused ? (
              <div className="textarea-wrapper">
                <textarea
                  name="text-area"
                  id="text"
                  value={textAreaData}
                  onChange={(e) => SettingNoteFunction(e.target.value)}
                  ref={textAreaStatus}
                  style={{ fontSize: noteArray[chosenIndex].font_size }}
                ></textarea>
              </div>
            ) : (
              <>
                {noteArray.length > 0 && chosenIndex !== null && (
                  <div className="person-text">
                    {noteArray[chosenIndex].styles_status.map((e, index) => {
                      return (
                        <span
                          className="customizing"
                          key={index}
                          onClick={
                            e.chosen
                              ? () => ChooseToCustomize(e, false)
                              : () => ChooseToCustomize(e, true)
                          }
                          style={
                            e.chosen
                              ? {
                                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                                  borderRadius: "10px",
                                  fontWeight: e.bolder_style,
                                  fontStyle: e.italic_style,
                                  textDecoration: e.line_style,
                                  fontSize: noteArray[chosenIndex].font_size,
                                }
                              : {
                                  fontWeight: e.bolder_style,
                                  fontStyle: e.italic_style,
                                  textDecoration: e.line_style,
                                  fontSize: noteArray[chosenIndex].font_size,
                                }
                          }
                        >
                          {e.word}
                        </span>
                      );
                    })}
                    {noteArray[chosenIndex].list.length !== 0 &&
                      noteArray[chosenIndex].list_status && (
                        <div className="person-ul-list-wrapper">
                          <ul>
                            <>
                              {noteArray[chosenIndex].list.map((e, idx) => {
                                return (
                                  <li>
                                    <span
                                      className="list-content-wrapper"
                                      style={
                                        e.list_styling.chosen
                                          ? {
                                              backgroundColor:
                                                "rgba(0, 0, 0, 0.1)",
                                              borderRadius: "10px",
                                              fontWeight:
                                                e.list_styling.bolder_style,
                                              fontStyle:
                                                e.list_styling.italic_style,
                                              textDecoration:
                                                e.list_styling.line_style,
                                              fontSize:
                                                noteArray[chosenIndex]
                                                  .font_size,
                                            }
                                          : {
                                              fontWeight:
                                                e.list_styling.bolder_style,
                                              fontStyle:
                                                e.list_styling.italic_style,
                                              textDecoration:
                                                e.list_styling.line_style,
                                              fontSize:
                                                noteArray[chosenIndex]
                                                  .font_size,
                                            }
                                      }
                                      onClick={
                                        noteArray[chosenIndex].list[idx]
                                          .list_styling.chosen
                                          ? () =>
                                              ChosenToCustomizeList(
                                                noteArray[chosenIndex].list[
                                                  idx
                                                ],
                                                false
                                              )
                                          : () =>
                                              ChosenToCustomizeList(
                                                noteArray[chosenIndex].list[
                                                  idx
                                                ],
                                                true
                                              )
                                      }
                                    >
                                      {e.list_inner_text}
                                    </span>
                                  </li>
                                );
                              })}
                            </>
                          </ul>
                          <div
                            className="list-open-settings-wrapper"
                            onClick={() => {
                              listNotesArray.current =
                                noteArray[chosenIndex!].list;

                              noteArray[chosenIndex!].change_status = true;
                              setNoteArray([...noteArray]);
                              setDarkerStatus(true);
                            }}
                          >
                            <img
                              src={inner_data_changer}
                              alt="rewrite"
                              width={13}
                            />
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="right-text-warning">
            First of all, create note in the left side of the page and then
            choose note in which you can make notes
          </div>
        )}
      </>
      {/*  */}
      {/* mobile modal window */}
      <div
        className={
          modalMobileWinStatus
            ? "modal-mobile-menu-wrapper-open modal-mobile-menu-wrapper"
            : "modal-mobile-menu-wrapper"
        }
      >
        <div
          className="font-mobile-style-changer "
          onClick={
            mobileFontStylesWindowStatus
              ? () => FontSetter(false, setMobileFontStylesWindowStatus)
              : () => FontSetter(true, setMobileFontStylesWindowStatus)
          }
        >
          <img src={font_icon} alt="font-family" width={25}></img>
          <div>Fonts</div>
        </div>

        {mobileFontStylesWindowStatus && (
          <div
            className="font-family-mobile-dropdown-wrapper"
            style={
              spinnerStatus
                ? {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }
                : {}
            }
          >
            {spinnerStatus ? (
              <MDBSpinner role="status">
                <span className="visually-hidden">Loading...</span>
              </MDBSpinner>
            ) : (
              <>
                {fonts.map((e, idx) => {
                  return (
                    <div
                      className="font-family-mobile-wrapper"
                      key={idx}
                      onClick={() => {
                        noteArray[chosenIndex!].font = e.font;
                        setNoteArray([...noteArray]);
                      }}
                      style={{ fontFamily: e.font }}
                    >
                      {e.font}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}

        <div
          className="font-mobile-style-changer"
          onClick={
            rangeModalMobileStatus
              ? () => setRangeModalMobileStatus(false)
              : () => setRangeModalMobileStatus(true)
          }
        >
          <img src={text_size_icon} alt="text-size" width={25} />
          <div>Text size</div>
        </div>

        {rangeModalMobileStatus && (
          <div className="modal-mobile-range-window">
            <div className="modal-range-title-wrapper">
              <h1>Set text size</h1>
            </div>
            <div className="input-wrapper">
              <span>1px</span>
              <div>
                <input
                  value={noteArray[chosenIndex!].font_size}
                  type="range"
                  min={1}
                  max={30}
                  onChange={(e) => {
                    noteArray[chosenIndex!].font_size = parseInt(
                      e.target.value
                    );
                    setNoteArray([...noteArray]);
                  }}
                />
              </div>

              <span>30px</span>
            </div>
            <div className="total-size">
              <span>Font size: {noteArray[chosenIndex!].font_size}px</span>
            </div>
          </div>
        )}
      </div>
      {modalMobileWinStatus && (
        <div className="dark-background">
          <div
            className="close-button"
            style={{ margin: 10 }}
            onClick={() => setModalMobileWinStatus(false)}
          ></div>
        </div>
      )}
      <>
        {darkerStatus && chosenIndex !== null ? (
          <div className="darker-background">
            <div
              className="close-button"
              onClick={() => setDarkerStatus(false)}
            ></div>
            <div className="modal-list-wrapper">
              <div className="modal-list">
                {noteArray[chosenIndex].list.map((e, idx) => {
                  return (
                    <>
                      {e.changes_modal_list ? (
                        <div className="notes-title-changer-wrapper">
                          <div className="notes-title-changer">
                            <div className="notes-adder">
                              <div className="input-wrapper">
                                <input
                                  type="text"
                                  placeholder="Change note title here"
                                  value={e.list_inner_text}
                                  onChange={(e) =>
                                    ChangeInputListTitle(e.target.value, idx)
                                  }
                                  id="change-note-title"
                                />
                              </div>
                              <div className="save-cancel-block-wrapper">
                                <div className="delete-button">
                                  <button
                                    className="cancel"
                                    onClick={() => DeleterModalList(idx)}
                                  >
                                    Delete
                                  </button>
                                </div>

                                <div className="cancel-button">
                                  <button
                                    className="cancel"
                                    onClick={() => CancelChanges(idx)}
                                  >
                                    Cancel
                                  </button>
                                </div>
                                <div className="save-button">
                                  <button
                                    className="save"
                                    onClick={() => SaveModalListChanges(idx)}
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
                          className="list-task-bin"
                          style={{ height: "unset", marginBottom: 10 }}
                          key={idx}
                        >
                          <div className="list-task-content-wrapper">
                            <div className="list-idx">{idx}.</div>
                            <div className="list-task-content-text">
                              {e.list_inner_text}
                            </div>
                            <Button
                              index={idx}
                              getIndex={SettingModalStatusChanges}
                            ></Button>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}

                {listTasksAdder ? (
                  <div className="input-block-list-note-data">
                    <div className="input-list-wrapper">
                      <input
                        type="text"
                        placeholder="Add list note title here"
                        value={inputModalValue}
                        onChange={(e) => setInputModalValue(e.target.value)}
                        id="set_tab_name"
                      />
                    </div>
                    <div className="save-cancel-block-wrapper">
                      <div className="cancel-button">
                        <button
                          className="cancel"
                          onClick={() => setListTasksAdder(false)}
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="save-button">
                        <button
                          className="save"
                          onClick={() => {
                            AddingListNotes(true, inputModalValue);
                            setListTasksAdder(false);
                            setInputModalValue("");
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="button-controls-wrapper">
                    <div
                      className="task-adder"
                      onClick={() => setListTasksAdder(true)}
                    >
                      <img src={add_list_note} alt="add" width={20} />
                      <span>Add list note</span>
                    </div>
                    <div
                      className="task-uplolad"
                      onClick={() => {
                        if (listNotesArray.current.length !== 0) {
                          setNoteArray(
                            noteArray.map((e, idx) => {
                              if (idx === chosenIndex) {
                                e.list_status = true;
                                return e;
                              }
                              return e;
                            })
                          );
                          setDarkerStatus(false);
                          listNotesArray.current = [];
                        } else {
                          setDarkerStatus(false);
                        }
                      }}
                    >
                      <img src={upload_changes} alt="upload" width={20} />
                      <span>Upload list</span>
                    </div>
                    {noteArray[chosenIndex!].change_status && (
                      <div
                        className="task-uplolad"
                        onClick={() => {
                          noteArray[chosenIndex!].change_status = false;
                          noteArray[chosenIndex!].list =
                            listNotesArray.current = [];
                          noteArray[chosenIndex!].list_status = false;
                          setNoteArray([...noteArray]);
                          setDarkerStatus(false);
                        }}
                      >
                        <img src={trash_icon} alt="delete-table" width={20} />
                        <span>Delete list</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
      {/*  */}
    </section>
  );
};
