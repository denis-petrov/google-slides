import React from 'react'
import {AppBar, Toolbar} from '@material-ui/core'
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
import FormatColorFillRoundedIcon from '@material-ui/icons/FormatColorFillRounded'
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
import {createPdf} from "../functions/createPdf";


const fileField = React.createRef<HTMLInputElement>()
const imageFiled = React.createRef<HTMLInputElement>()
const imageToBackFiled = React.createRef<HTMLInputElement>()

export default function Nav() {
    return (
        <div>
            <AppBar position="static" className="nav">
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
                                    }}>
                                        Export
                                    </Dropdown.Item>
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
                        dispatch(deleteSlides, {})
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
                                <label htmlFor="myImage" className="btn-sm button__onclick dropbox_image__item">
                                    <FormatColorFillRoundedIcon /> Select color
                                </label>
                                <input
                                    className="dropbox__open_button"
                                    id="myImage"
                                    name="myImage"
                                    accept="image/*"
                                    /*onChange={(e) => insertImageFromPc(e)}*/
                                    ref={imageFiled}
                                    type="file"
                                />
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

                </Toolbar>
            </AppBar>
            <hr className="second_nav__hr"/>
        </div>
    )
}