import React from 'react'
import {AppBar, TextField, Toolbar} from '@material-ui/core'
import {Dropdown} from 'react-bootstrap'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import RedoIcon from '@material-ui/icons/Redo'
import UndoIcon from '@material-ui/icons/Undo'
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import TextFieldsIcon from '@material-ui/icons/TextFields'
import CropOriginalIcon from '@material-ui/icons/CropOriginal'
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded'
import SlideshowRoundedIcon from '@material-ui/icons/SlideshowRounded'
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import FormatBoldRoundedIcon from '@material-ui/icons/FormatBoldRounded'
import FormatItalicRoundedIcon from '@material-ui/icons/FormatItalicRounded'
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import 'bootstrap/dist/css/bootstrap.min.css'
import './nav.css'
import {addEmptySlide} from '../functions/addEmptySlide'
import {savePresentationToPc} from '../functions/savePresentationToPc'
import {dispatch, getEditor, reDo, setEditor, unDo} from '../stateManager/StateManager'
import {openPresentationFromPc} from '../functions/openPresentationFromPc'
import {changeNamePresentation} from '../functions/changeNamePresentation'
import {DEFAULT_ELLIPSE, DEFAULT_RECTANGLE, DEFAULT_TEXT, DEFAULT_TRIANGLE} from "../entities/Constants"
import {deleteSlides} from "../functions/deleteSlides"
import {Editor} from "../entities/Editor"
import {addSomeElement} from "../functions/addSomeElement"
import {insertImageFromPc} from "../functions/insertImageFromPc"
import FormDialog from "./FomDialog"
import {addToBackground} from "../functions/addToBackground"
import {addElement} from "../functions/addElement"
import ColorPickerLol from "./ColorPicker"
import {createPdf} from "../functions/createPdf"
import {changeTextFont} from "../functions/changeTextFont"
import {changeTextSize} from "../functions/changeTextSize"
import ColorPicker from "react-pick-color"
import {changeElementFillColor} from "../functions/changeElementFillColor"
import {deleteElements} from "../functions/deleteElements"
import {changeTextBold} from "../functions/changeTextBold"
import {changeTextItalic} from "../functions/changeTextItalic"
import {changeTextUnderline} from "../functions/changeTextUnderline"
import {changeElementBorderColor} from "../functions/changeElementBorderColor"
import {getSelectedElement} from "../functions/getSelectedElement"
import {ElementType, Text} from "../entities/Elements"
import {changeBorderWidth} from "../functions/changeBorderWidth"
import {showPresentation} from "../functions/showPresentation"


const fileField = React.createRef<HTMLInputElement>()
const imageFiled = React.createRef<HTMLInputElement>()
const imageToBackFiled = React.createRef<HTMLInputElement>()

export default function Nav() {
    const elem = getSelectedElement()
    let fillColor
    let borderColor
    let borderSizeView
    let font
    let fontSize
    if ((elem !== undefined) && (elem != null)) {
        borderColor = `rgb(${elem.borderColor.red},${elem.borderColor.green},${elem.borderColor.blue})`
        borderSizeView = `${elem.borderWidth}`
        if (elem.type === ElementType.text) {
            const textStyle = (elem as Text).textStyle
            fillColor = `rgb(${textStyle.color.red},${textStyle.color.green},${textStyle.color.blue})`
            font = textStyle.font
            fontSize = textStyle.sizeFont
        } else {
            if (elem.backgroundColor != null) {
                fillColor = `rgb(${elem.backgroundColor.red},${elem.backgroundColor.green},${elem.backgroundColor.blue})`
            }
        }
    }

    return (
        <div id='nav_bar'>
            <div className="row nav__line">
                <AppBar position="static" className="nav col col-lg-10">
                    <Toolbar variant="dense">
                        <img src="/nav__logo.png" alt="logo" className="nav__file_icon"/>

                        <div className="container-fluid">
                            <div className="row">
                                <input type="text" className="form-control nav__presentation_name" id="presentationName"
                                       aria-describedby="emailHelp" placeholder="NEW PRESENTATION"
                                       value={getEditor().presentation.name}
                                       onChange={(e) =>
                                           dispatch(changeNamePresentation, e.target.value)
                                       }
                                />
                            </div>
                            <div className="row nav__menu_dropbox">
                                <Dropdown>
                                    <Dropdown.Toggle className="btn-light btn-sm dropbox__file dropbox__button"
                                                     variant="success" id="dropdown-file">
                                        File
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <div>
                                            <label htmlFor="myfile"
                                                   className="dropbox__open_data btn-sm button__onclick">Open</label>
                                            <input
                                                className="dropbox__open_button"
                                                id="myfile"
                                                name="myfile"
                                                accept=".json"
                                                onChange={(e) => openPresentationFromPc(e)}
                                                ref={fileField}
                                                type="file"
                                            />
                                        </div>

                                        <Dropdown.Item className="btn-sm button__onclick" onClick={() => {
                                            savePresentationToPc(getEditor())
                                        }}>Save</Dropdown.Item>
                                        <Dropdown.Item className="btn-sm button__onclick" onClick={async () => {
                                            (await createPdf()).save(getEditor().presentation.name)
                                        }}>Export to PDF</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Dropdown>
                                    <Dropdown.Toggle className="btn-light btn-sm dropbox__insert dropbox__button"
                                                     variant="success" id="dropdown-insert">
                                        Insert
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item className="btn-sm button__onclick"
                                                       onClick={() => {
                                                           addSomeElement(DEFAULT_TRIANGLE)
                                                       }}>
                                            Triangle
                                        </Dropdown.Item>
                                        <Dropdown.Item className="btn-sm button__onclick"
                                                       onClick={() => {
                                                           addSomeElement(DEFAULT_ELLIPSE)
                                                       }}>
                                            Ellipse
                                        </Dropdown.Item>
                                        <Dropdown.Item className="btn-sm button__onclick"
                                                       onClick={() => {
                                                           addSomeElement(DEFAULT_RECTANGLE)
                                                       }}>
                                            Rectangle
                                        </Dropdown.Item>
                                        <Dropdown.Item className="btn-sm button__onclick"
                                                       onClick={() => {
                                                           addSomeElement(DEFAULT_TEXT)
                                                       }}>
                                            Text
                                        </Dropdown.Item>
                                        <Dropdown.Item className="btn-sm button__onclick">Image</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Dropdown>
                                    <Dropdown.Toggle className="btn-light btn-sm dropbox__slide dropbox__button"
                                                     variant="success" id="dropdown-slide">
                                        Slide
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item className="btn-sm button__onclick" onClick={() => {
                                            let newWindow = window.open('/loading.html') as Window
                                            newWindow.onload = async () => {
                                                newWindow.location.href = URL.createObjectURL((await createPdf()).output('blob'))
                                            }
                                        }}>New slide</Dropdown.Item>
                                        <Dropdown.Item className="btn-sm button__onclick" onClick={() => {
                                            dispatch(deleteSlides, {})
                                            if (getEditor().presentation.slides.length === 0) {
                                                dispatch((editorInput: Editor) => {
                                                    let newEditorOneSlide: Editor = addEmptySlide(editorInput)
                                                    newEditorOneSlide.selectionSlidesId.push(newEditorOneSlide.presentation.slides[0].id)
                                                    return newEditorOneSlide
                                                }, {})
                                            }
                                        }}>
                                            Delete slide
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className="col col-lg-2 text-center">
                    <div className='show_inline'>
                        <button id='show_presentation_btn' type="button"
                                className="btn btn-sm button__onclick dropbox__button button__show"
                                onClick={() => showPresentation()}>
                            <SlideshowRoundedIcon/> Show
                        </button>
                        <Dropdown>
                            <Dropdown.Toggle
                                className="btn btn-sm button__onclick dropbox__button button__show button__show_arrow"
                                variant="success" id="dropdown-insert">
                                <ArrowDropDownIcon/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item className="btn-sm button__onclick"
                                               onClick={() => {
                                                   let editor = getEditor()
                                                   setEditor({
                                                       ...editor,
                                                       selectionSlidesId: [editor.presentation.slides[0].id]
                                                   })
                                                   showPresentation()
                                               }}>
                                    From first slide
                                </Dropdown.Item>
                                <Dropdown.Item className="btn-sm button__onclick"
                                               onClick={() => showPresentation()}>
                                    From current slide
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>

            <hr className="nav__hr"/>

            <AppBar position="static" className="nav">
                <Toolbar variant="dense">
                    <button type="button" className="btn btn-sm button__onclick dropbox__button" onClick={() => {
                        if (getEditor().presentation.slides.length === 0) {
                            dispatch((editorInput: Editor) => {
                                let newEditorOneSlide: Editor = addEmptySlide(editorInput)
                                newEditorOneSlide.selectionSlidesId.push(newEditorOneSlide.presentation.slides[0].id)
                                return newEditorOneSlide
                            }, {})
                        } else {
                            dispatch(addEmptySlide, {})
                        }
                    }}>
                        <AddIcon/>
                    </button>

                    <button type="button" className="btn btn-sm button__onclick dropbox__button" onClick={() => {
                        dispatch(deleteSlides, {})
                        if (getEditor().presentation.slides.length === 0) {
                            dispatch((editorInput: Editor) => {
                                let newEditorOneSlide: Editor = addEmptySlide(editorInput)
                                newEditorOneSlide.selectionSlidesId.push(newEditorOneSlide.presentation.slides[0].id)
                                return newEditorOneSlide
                            }, {})
                        }
                    }}>
                        <RemoveIcon/>
                    </button>

                    <button type="button" className="btn btn-light btn-sm button__onclick dropbox__button"
                            onClick={() => {
                                unDo()
                            }}>
                        <UndoIcon/>
                    </button>

                    <button type="button" className="btn btn-light btn-sm button__onclick dropbox__button"
                            onClick={() => {
                                reDo()
                            }}>
                        <RedoIcon/>
                    </button>

                    <div className="vertical_separator">&nbsp;</div>

                    <button type="button" className="btn btn-light btn-sm button__onclick dropbox__button"
                            onClick={() => {
                                addSomeElement(DEFAULT_TRIANGLE)
                            }}>
                        <ChangeHistoryIcon/>
                    </button>

                    <button type="button" className="btn btn-light btn-sm button__onclick dropbox__button"
                            onClick={() => {
                                addSomeElement(DEFAULT_ELLIPSE)
                            }}>
                        <RadioButtonUncheckedIcon/>
                    </button>

                    <button type="button" className="btn btn-light btn-sm button__onclick dropbox__button"
                            onClick={() => {
                                addSomeElement(DEFAULT_RECTANGLE)
                            }}>
                        <CheckBoxOutlineBlankIcon/>
                    </button>

                    <button type="button" className="btn btn-light btn-sm button__onclick dropbox__button"
                            onClick={() => {
                                addSomeElement(DEFAULT_TEXT)
                            }}>
                        <TextFieldsIcon/>
                    </button>

                    <Dropdown>
                        <Dropdown.Toggle className="btn-light btn-sm dropbox__insert dropbox__button"
                                         variant="success" id="dropdown-insert">
                            <CropOriginalIcon/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <div>
                                <label htmlFor="myImage" className="btn-sm button__onclick dropbox_image__item">
                                    <GetAppRoundedIcon/> Insert from computer
                                </label>
                                <input
                                    className="dropbox__open_button"
                                    id="myImage"
                                    name="myImage"
                                    accept="image/*"
                                    onChange={(e: any) => {
                                        if (e.target.files !== null) {
                                            insertImageFromPc(e, addElement)

                                            e.target.value = null
                                        }
                                    }}
                                    ref={imageFiled}
                                    type="file"
                                />
                            </div>
                            <div>
                                <FormDialog isBackground={false}/>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>

                    <div className="vertical_separator">&nbsp;</div>

                    <Dropdown>
                        <Dropdown.Toggle className="btn-light btn-sm dropbox__insert dropbox__button"
                                         variant="success" id="dropdown-insert">
                            Background
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <div>
                                <ColorPickerLol/>
                            </div>
                            <div>
                                <label htmlFor="myBackImage" className="btn-sm button__onclick dropbox_image__item">
                                    <GetAppRoundedIcon/> Insert from computer
                                </label>
                                <input
                                    type="file"
                                    className="dropbox__open_button"
                                    id="myBackImage"
                                    name="myBackImage"
                                    accept="image/*"
                                    onChange={(e: any) => {
                                        if (e.target.files !== null) {
                                            insertImageFromPc(e, addToBackground)

                                            e.target.value = null
                                        }
                                    }}
                                    ref={imageToBackFiled}
                                />
                            </div>
                            <div>
                                <FormDialog isBackground={true}/>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>

                    {/* separator */}
                    <div id="edit_style_text_sep_0" className="vertical_separator hidden">&nbsp;</div>

                    {/*delete element*/}
                    <button id="edit_style_text_delete" type="button"
                            className="btn btn-sm button__onclick dropbox__button hidden" onClick={() => {
                        dispatch(deleteElements, {})
                    }}>
                        <DeleteRoundedIcon/>
                    </button>

                    {/* separator */}
                    <div id="edit_style_text_sep_1" className="vertical_separator hidden">&nbsp;</div>

                    {/*Fill backgroundColor*/}
                    <Dropdown id="edit_style_element_fill_color" className="hidden">
                        <Dropdown.Toggle className="btn-light btn-sm btn button__onclick dropbox__button"
                                         variant="success" id="dropdown-slide">
                            <div id="fill_element" className="edit_style_text__font">
                                <div style={{float: 'left'}}>
                                    Fill &zwj;
                                </div>
                                <div className="rect_color" style={{backgroundColor: fillColor}}/>
                                <ArrowDropDownRoundedIcon/>
                            </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <ColorPicker color={fillColor} onChange={(color) => {
                                dispatch(changeElementFillColor, color.hex)
                            }} hideAlpha={true} hideInputs={true}/>
                        </Dropdown.Menu>
                    </Dropdown>

                    {/*Border color*/}
                    <Dropdown id="edit_style_element_border_color" className="hidden">
                        <Dropdown.Toggle className="btn-light btn-sm btn button__onclick dropbox__button"
                                         variant="success" id="dropdown-slide">
                            <div id="border_element" className="edit_style_text__font">
                                <div style={{float: 'left'}}>
                                    Border &zwj;
                                </div>
                                <div className="rect_color" style={{backgroundColor: borderColor}}/>
                                <ArrowDropDownRoundedIcon/>
                            </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <ColorPicker color={borderColor} onChange={(color) => {
                                dispatch(changeElementBorderColor, color.hex)
                            }} hideAlpha={true} hideInputs={true}/>
                        </Dropdown.Menu>
                    </Dropdown>

                    {/* Border size */}
                    <div id="edit_style_border_size" className="hidden edit_style_text_size">
                        <TextField
                            size="small"
                            label="border-size"
                            inputProps={{min: 0, style: {textAlign: 'center'}}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={borderSizeView}
                            type="number"
                            onChange={(e) => {
                                dispatch(changeBorderWidth, e.target.value)
                            }}
                        />
                    </div>

                    {/* separator */}
                    <div id="edit_style_text_sep_2" className="vertical_separator hidden">&nbsp;</div>

                    {/*bold text*/}
                    <button id="edit_style_text_bold" type="button"
                            className="btn btn-sm button__onclick dropbox__button hidden" onClick={() => {
                        dispatch(changeTextBold, {})
                    }}>
                        <FormatBoldRoundedIcon/>
                    </button>

                    {/*italic text*/}
                    <button id="edit_style_text_italic" type="button"
                            className="btn btn-sm button__onclick dropbox__button hidden" onClick={() => {
                        dispatch(changeTextItalic, {})
                    }}>
                        <FormatItalicRoundedIcon/>
                    </button>

                    {/*italic text*/}
                    <button id="edit_style_text_underline" type="button"
                            className="btn btn-sm button__onclick dropbox__button hidden" onClick={() => {
                        dispatch(changeTextUnderline, {})
                    }}>
                        <FormatUnderlinedIcon/>
                    </button>

                    {/* separator 2*/}
                    <div id="edit_style_text_sep_3" className="vertical_separator hidden">&nbsp;</div>

                    {/* font */}
                    <Dropdown id="edit_style_text_font" className="hidden">
                        <Dropdown.Toggle className="btn-light btn-sm btn button__onclick dropbox__button"
                                         variant="success" id="dropdown-slide">
                            <div id="font_text" className="edit_style_text__font">{font} <ArrowDropDownRoundedIcon/>
                            </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item className="btn-sm button__onclick edit_style_text__time_new_roman"
                                           onClick={() => {
                                               dispatch(changeTextFont, 'Times New Roman')
                                           }}>
                                Times New Roman
                            </Dropdown.Item>
                            <Dropdown.Item className="btn-sm button__onclick edit_style_text__roboto" onClick={() => {
                                dispatch(changeTextFont, 'Roboto')
                            }}>
                                Roboto
                            </Dropdown.Item>
                            <Dropdown.Item className="btn-sm button__onclick edit_style_text__arial" onClick={() => {
                                dispatch(changeTextFont, 'Arial')
                            }}>
                                Arial
                            </Dropdown.Item>
                            <Dropdown.Item className="btn-sm button__onclick edit_style_text__cambria" onClick={() => {
                                dispatch(changeTextFont, 'Cambria')
                            }}>
                                Cambria
                            </Dropdown.Item>
                            <Dropdown.Item className="btn-sm button__onclick edit_style_text__samanata" onClick={() => {
                                dispatch(changeTextFont, 'Samanata')
                            }}>
                                Samanata
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    {/* separator */}
                    <div id="edit_style_text_sep_4" className="vertical_separator hidden">&nbsp;</div>

                    {/* Font size */}
                    <div id="edit_style_text_size" className="hidden edit_style_text_size">
                        <TextField
                            size="small"
                            label="font-size"
                            inputProps={{min: 0, style: {textAlign: 'center'}}}
                            value={fontSize}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => {
                                dispatch(changeTextSize, e.target.value)
                            }}
                        />
                    </div>

                </Toolbar>
            </AppBar>
            <hr className="second_nav__hr"/>
        </div>
    )
}