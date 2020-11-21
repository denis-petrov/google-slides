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
import 'bootstrap/dist/css/bootstrap.min.css'
import './nav.css'
import {addEmptySlide} from '../functions/addEmptySlide'
import {savePresentationToPc} from '../functions/savePresentationToPc'
import {dispatch, getEditor, reDo, unDo} from '../stateManager/StateManager'
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
import {changeTextColor} from "../functions/changeTextColor"


const fileField = React.createRef<HTMLInputElement>()
const imageFiled = React.createRef<HTMLInputElement>()
const imageToBackFiled = React.createRef<HTMLInputElement>()

export default function Nav() {
    const [font, setFont] = React.useState('Arial')
    const [size, setSize] = React.useState('40')
    const [color, setColor] = React.useState('#000000')

    return (
        <div>
            <div className="row nav__line">
                <AppBar position="static" className="nav col col-lg-10">
                    <Toolbar variant="dense">
                        <img src="/nav__logo.png" alt="logo" className="nav__file_icon" />

                        <div className="container-fluid">
                            <div className="row">
                                <input type="text" className="form-control nav__presentation_name" id="presentationName"
                                       aria-describedby="emailHelp" placeholder="NEW PRESENTATION" value={getEditor().presentation.name}
                                       onChange={(e) =>
                                           dispatch(changeNamePresentation, e.target.value)
                                       }
                                />
                            </div>
                            <div className="row nav__menu_dropbox">
                                <Dropdown>
                                    <Dropdown.Toggle className="btn-light btn-sm dropbox__file dropbox__button" variant="success" id="dropdown-file">
                                        File
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <div>
                                            <label htmlFor="myfile" className="dropbox__open_data btn-sm button__onclick">Open</label>
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
                                        <Dropdown.Item className="btn-sm button__onclick" onClick={() => {
                                            createPdf().save(getEditor().presentation.name)
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
                                                       onClick={() => {addSomeElement(DEFAULT_TRIANGLE)}}>
                                            Triangle
                                        </Dropdown.Item>
                                        <Dropdown.Item className="btn-sm button__onclick"
                                                       onClick={() => {addSomeElement(DEFAULT_ELLIPSE)}}>
                                            Ellipse
                                        </Dropdown.Item>
                                        <Dropdown.Item className="btn-sm button__onclick"
                                                       onClick={() => {addSomeElement(DEFAULT_RECTANGLE)}}>
                                            Rectangle
                                        </Dropdown.Item>
                                        <Dropdown.Item className="btn-sm button__onclick"
                                                       onClick={() => {addSomeElement(DEFAULT_TEXT)}}>
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
                                            dispatch(addEmptySlide, {})
                                        }}>New slide</Dropdown.Item>
                                        <Dropdown.Item className="btn-sm button__onclick" onClick={() => {
                                            dispatch(deleteSlides, {})
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
                    <button type="button" className="btn btn-sm button__onclick dropbox__button button__show" onClick={() => {
                        createPdf().save(getEditor().presentation.name)
                    }}>
                        <SlideshowRoundedIcon /> Show
                    </button>
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
                        <AddIcon />
                    </button>

                    <button type="button" className="btn btn-sm button__onclick dropbox__button" onClick={() => {
                        if (getEditor().presentation.slides.length > 1) {
                            dispatch(deleteSlides, {})
                        }
                    }}>
                        <RemoveIcon />
                    </button>

                    <button type="button" className="btn btn-light btn-sm button__onclick dropbox__button" onClick={() => {
                        unDo()
                    }}>
                        <UndoIcon />
                    </button>

                    <button type="button" className="btn btn-light btn-sm button__onclick dropbox__button" onClick={() => {
                        reDo()
                    }}>
                        <RedoIcon />
                    </button>

                    <div className="vertical_separator">&nbsp;</div>

                    <button type="button" className="btn btn-light btn-sm button__onclick dropbox__button"
                            onClick={() => {addSomeElement(DEFAULT_TRIANGLE)}}>
                        <ChangeHistoryIcon />
                    </button>

                    <button type="button" className="btn btn-light btn-sm button__onclick dropbox__button"
                            onClick={() => {addSomeElement(DEFAULT_ELLIPSE)}}>
                        <RadioButtonUncheckedIcon />
                    </button>

                    <button type="button" className="btn btn-light btn-sm button__onclick dropbox__button"
                            onClick={() => {addSomeElement(DEFAULT_RECTANGLE)}}>
                        <CheckBoxOutlineBlankIcon />
                    </button>

                    <button type="button" className="btn btn-light btn-sm button__onclick dropbox__button"
                            onClick={() => {addSomeElement(DEFAULT_TEXT)}}>
                        <TextFieldsIcon />
                    </button>

                    <Dropdown>
                        <Dropdown.Toggle className="btn-light btn-sm dropbox__insert dropbox__button"
                                         variant="success" id="dropdown-insert">
                            <CropOriginalIcon />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <div>
                                <label htmlFor="myImage" className="btn-sm button__onclick dropbox_image__item">
                                    <GetAppRoundedIcon /> Insert from computer
                                </label>
                                <input
                                    className="dropbox__open_button"
                                    id="myImage"
                                    name="myImage"
                                    accept="image/*"
                                    onChange={(e) => insertImageFromPc(e, addElement)}
                                    ref={imageFiled}
                                    type="file"
                                />
                            </div>
                            <div>
                                <FormDialog isBackground={false} />
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
                                <ColorPickerLol />
                            </div>
                            <div>
                                <label htmlFor="myBackImage" className="btn-sm button__onclick dropbox_image__item">
                                    <GetAppRoundedIcon /> Insert from computer
                                </label>
                                <input
                                    className="dropbox__open_button"
                                    id="myBackImage"
                                    name="myBackImage"
                                    accept="image/*"
                                    onChange={(e) => insertImageFromPc(e, addToBackground)}
                                    ref={imageToBackFiled}
                                    type="file"
                                />
                            </div>
                            <div>
                                <FormDialog isBackground={true} />
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>

                    {/* separator */}
                    <div id="edit_style_text_sep_0" className="vertical_separator hidden">&nbsp;</div>

                    {/* font */}
                    <Dropdown id="edit_style_text_font" className="hidden">
                        <Dropdown.Toggle className="btn-light btn-sm btn button__onclick dropbox__button"
                                         variant="success" id="dropdown-slide">
                            <div id="font_text" className="edit_style_text__font">{font} <ArrowDropDownRoundedIcon /></div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item className="btn-sm button__onclick edit_style_text__time_new_roman" onClick={() => {
                                setFont('Times New Roman')
                                dispatch(changeTextFont, 'Times New Roman')
                            }}>
                                Times New Roman
                            </Dropdown.Item>
                            <Dropdown.Item className="btn-sm button__onclick edit_style_text__roboto" onClick={() => {
                                setFont('Roboto')
                                dispatch(changeTextFont, 'Roboto')
                            }}>
                                Roboto
                            </Dropdown.Item>
                            <Dropdown.Item className="btn-sm button__onclick edit_style_text__arial" onClick={() => {
                                setFont('Arial')
                                dispatch(changeTextFont, 'Arial')
                            }}>
                                Arial
                            </Dropdown.Item>
                            <Dropdown.Item className="btn-sm button__onclick edit_style_text__cambria" onClick={() => {
                                setFont('Cambria')
                                dispatch(changeTextFont, 'Cambria')
                            }}>
                                Cambria
                            </Dropdown.Item>
                            <Dropdown.Item className="btn-sm button__onclick edit_style_text__samanata" onClick={() => {
                                setFont('Samanata')
                                dispatch(changeTextFont, 'Samanata')
                            }}>
                                Samanata
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    {/* separator */}
                    <div id="edit_style_text_sep_1" className="vertical_separator hidden">&nbsp;</div>

                    {/* Size */}
                    <div id="edit_style_text_size" className="hidden edit_style_text_size">
                        <TextField
                            size="small"
                            inputProps={{min: 0, style: { textAlign: 'center' }}}
                            placeholder={size}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => {
                                setSize(e.target.value + 'px')
                                dispatch(changeTextSize, e.target.value)
                            }}
                        />
                    </div>

                    {/* separator */}
                    <div id="edit_style_text_sep_2" className="vertical_separator hidden">&nbsp;</div>

                    {/*Text color*/}
                    <Dropdown id="edit_style_text_color" className="hidden">
                        <Dropdown.Toggle className="btn-light btn-sm btn button__onclick dropbox__button"
                                         variant="success" id="dropdown-slide">
                            <div id="font_text" className="edit_style_text__font">
                               <div className="rect_color" style={{backgroundColor: color}} /> <ArrowDropDownRoundedIcon />
                            </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <ColorPicker color={color} onChange={(color) => {
                                setColor(color.hex)
                                dispatch(changeTextColor, color.hex)
                            }} hideAlpha={true} hideInputs={true} />
                        </Dropdown.Menu>
                    </Dropdown>
                </Toolbar>
            </AppBar>
            <hr className="second_nav__hr"/>
        </div>
    )
}