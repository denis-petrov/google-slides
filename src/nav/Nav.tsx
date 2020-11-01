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
import 'bootstrap/dist/css/bootstrap.min.css'
import './nav.css'
import {addEmptySlide} from '../functions/addEmptySlide'
import {savePresentationToPc} from '../functions/savePresentationToPc'
import {dispatch, getEditor, reDo, unDo} from '../stateManager/StateManager'
import {openPresentationFromPc} from '../functions/openPresentationFromPc'
import {changeNamePresentation} from '../functions/changeNamePresentation'
import {addElement} from "../functions/addElement"
import {Element} from "../entities/Elements"
import {DEFAULT_TRIANGLE, DEFAULT_ELLIPSE, DEFAULT_RECTANGLE} from "../entities/Constants"

const fileField = React.createRef<HTMLInputElement>()

export function deleteSlides() {
    const attributeName = 'data-is-checked'
    const slidesMenuItemClass = 'slides-menu-item'
    let allSelectedElements = document.getElementsByClassName(slidesMenuItemClass)

    for (let i = 0; i < allSelectedElements.length; i++) {
        let currElement = allSelectedElements[i]
        if (allSelectedElements[i].getAttribute(attributeName) === 'true') {
            currElement.remove()
        }
    }
}

function addSomeElement(elem: Element) {
    dispatch(addElement, elem)
}

export default function Nav() {
    return (
        <div>
            <AppBar position="static" className="nav">
                <Toolbar variant="dense">
                    <img src="/nav__logo.png" alt="logo" className="nav__file_icon" />

                    <div className="container-fluid">
                        <div className="row">
                            <input type="text" className="form-control nav__presentation_name" id="presentationName"
                                   aria-describedby="emailHelp" placeholder="NEW PRESENTATION"
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

                                    <Dropdown.Item href="#/action-2" className="btn-sm button__onclick" onClick={() => {
                                        savePresentationToPc(getEditor())
                                    }}>Save</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3" className="btn-sm button__onclick">Export</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown>
                                <Dropdown.Toggle className="btn-light btn-sm dropbox__insert dropbox__button"
                                                 variant="success" id="dropdown-insert">
                                    Insert
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1" className="btn-sm button__onclick">Text</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2" className="btn-sm button__onclick" onClick={() => {addSomeElement(DEFAULT_TRIANGLE)}}>Triangle</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3" className="btn-sm button__onclick" onClick={() => {addSomeElement(DEFAULT_RECTANGLE)}}>Rectangle</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3" className="btn-sm button__onclick" onClick={() => {addSomeElement(DEFAULT_ELLIPSE)}}>Ellipse</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3" className="btn-sm button__onclick">Image</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown>
                                <Dropdown.Toggle className="btn-light btn-sm dropbox__slide dropbox__button"
                                                 variant="success" id="dropdown-slide">
                                    Slide
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1" className="btn-sm button__onclick" onClick={() => {
                                        dispatch(addEmptySlide, {})
                                    }}>New slide</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2" className="btn-sm button__onclick" onClick={() => {
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
                        dispatch(addEmptySlide, {})
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

                    <button type="button" className="btn btn-light btn-sm button__onclick dropbox__button" onClick={() => {addSomeElement(DEFAULT_TRIANGLE)}}>
                        <ChangeHistoryIcon />
                    </button>

                    <button type="button" className="btn btn-light btn-sm button__onclick dropbox__button" onClick={() => {addSomeElement(DEFAULT_ELLIPSE)}}>
                        <RadioButtonUncheckedIcon />
                    </button>

                    <button type="button" className="btn btn-light btn-sm button__onclick dropbox__button" onClick={() => {addSomeElement(DEFAULT_RECTANGLE)}}>
                        <CheckBoxOutlineBlankIcon />
                    </button>

                    <button type="button" className="btn btn-light btn-sm button__onclick dropbox__button">
                        <TextFieldsIcon />
                    </button>
                </Toolbar>
            </AppBar>
            <hr className="second_nav__hr"/>
        </div>
    )
}
