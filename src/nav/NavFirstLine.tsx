import {Editor} from "../entities/Editor"
import React, {ChangeEvent, Dispatch} from "react"
import {connect} from "react-redux"
import {AppBar, Toolbar} from "@material-ui/core"
import {Dropdown} from "react-bootstrap"
import {ADD_ELEMENT, ADD_EMPTY_SLIDE, CHANGE_PRESENTATION_NAME, DELETE_SLIDES, NEW_EDITOR} from "../store/actionTypes"
import {changePrimitiveStyleMenu} from "../functions/changePrimitiveStyleMenu"
import {changeTextStyleMenu} from "../functions/changeTextStyleMenu"
import {DEFAULT_ELLIPSE, DEFAULT_RECTANGLE, DEFAULT_TEXT, DEFAULT_TRIANGLE} from "../entities/Constants"
import {savePresentationToPc} from "../functions/savePresentationToPc"
import {createPdf} from "../pdfCreation/createPdf"
import {openPresentationFromPc} from "../functions/openPresentationFromPc"
import {store} from "../store/store";
import {createPptx} from "../pptxCreation/createPptx";

const mapStateToProps = (state: Editor) => {
    return {
        state: state,
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        changePresentationName: (newName: string) => dispatch({type: CHANGE_PRESENTATION_NAME, payload: newName}),
        newPresentation: () => {
            dispatch({type: NEW_EDITOR})
            changePrimitiveStyleMenu(false)
            changeTextStyleMenu(false)
        },
        openPresentationFromPc: (e: ChangeEvent<HTMLInputElement>) => openPresentationFromPc(e, dispatch),

        addEmptySlide: () => dispatch({type: ADD_EMPTY_SLIDE}),
        deleteSlides: () => dispatch({type: DELETE_SLIDES}),

        addTriangle: () => dispatch({type: ADD_ELEMENT, payload: DEFAULT_TRIANGLE}),
        addEllipse: () => dispatch({type: ADD_ELEMENT, payload: DEFAULT_ELLIPSE}),
        addRectangle: () => dispatch({type: ADD_ELEMENT, payload: DEFAULT_RECTANGLE}),
        addText: () => dispatch({type: ADD_ELEMENT, payload: DEFAULT_TEXT}),
    }
}


function NavFirstLine(props: any) {
    let editor = props.state
    const fileField = React.createRef<HTMLInputElement>()

    return (
        <AppBar position="static" className="nav col col-lg-10">
            <Toolbar variant="dense">
                <img src="/nav__logo.png" alt="logo" className="nav__file_icon"/>

                <div className="container-fluid">
                    <div className="row">
                        <div className="presentation_name_container" data-presentation-name={editor.presentation.name}>
                            <input type="text" className="form-control nav__presentation_name" id="presentationName"
                                   aria-describedby="emailHelp" placeholder="NEW PRESENTATION"
                                   value={editor.presentation.name}
                                   style={{textOverflow: 'ellipsis'}}
                                   onChange={(e) =>
                                       props.changePresentationName(e.target.value)
                                   }
                            />
                        </div>
                    </div>
                    <div className="row nav__menu_dropbox">
                        <Dropdown>
                            <Dropdown.Toggle className="btn-light btn-sm dropbox__file dropbox__button"
                                             variant="success" id="dropdown-file">
                                File
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item className="btn-sm button__onclick"
                                               onClick={() => props.newPresentation()}>
                                    New presentation
                                </Dropdown.Item>

                                <div>
                                    <label htmlFor="myfile"
                                           className="dropbox__open_data btn-sm button__onclick">Open</label>
                                    <input
                                        className="dropbox__open_button"
                                        id="myfile"
                                        name="myfile"
                                        accept=".json"
                                        onChange={(e) => props.openPresentationFromPc(e)}
                                        ref={fileField}
                                        type="file"
                                    />
                                </div>

                                <Dropdown.Item className="btn-sm button__onclick" onClick={() => {
                                    savePresentationToPc(editor)
                                }}>Save</Dropdown.Item>

                                <Dropdown.Item className="btn-sm button__onclick" onClick={async () => {
                                    (await createPdf()).save(editor.presentation.name)
                                }}>Export to PDF</Dropdown.Item>

                                <Dropdown.Item className="btn-sm button__onclick" onClick={async ()=> {
                                    let editor = store.getState()
                                    let buffer = (await createPptx(editor))
                                    let blob = new Blob([new Uint8Array(buffer as ArrayBufferLike)])
                                    let tempLink = document.createElement('a')
                                    let presentationName = (editor.presentation.name.trim().length !== 0) ?
                                        editor.presentation.name : "New presentation"

                                    tempLink.href = window.URL.createObjectURL(blob)
                                    tempLink.setAttribute('download', `${presentationName}.pptx`)
                                    tempLink.click()

                                }}>
                                    Export to PPTX
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
                                               onClick={() => props.addTriangle()}>
                                    Triangle
                                </Dropdown.Item>
                                <Dropdown.Item className="btn-sm button__onclick"
                                               onClick={() => props.addEllipse()}>
                                    Ellipse
                                </Dropdown.Item>
                                <Dropdown.Item className="btn-sm button__onclick"
                                               onClick={() => props.addRectangle()}>
                                    Rectangle
                                </Dropdown.Item>
                                <Dropdown.Item className="btn-sm button__onclick"
                                               onClick={() => props.addText()}>
                                    Text
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown id="dropdown-slide">
                            <Dropdown.Toggle className="btn-light btn-sm dropbox__slide dropbox__button"
                                             variant="success">
                                Slide
                            </Dropdown.Toggle>

                            <Dropdown.Menu id="slide-menu-dropdown">
                                <Dropdown.Item className="btn-sm button__onclick"
                                               onClick={() => props.addEmptySlide()}>
                                    New slide
                                </Dropdown.Item>
                                <Dropdown.Item className="btn-sm button__onclick"
                                               onClick={() => props.deleteSlides()}>
                                    Delete slide
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavFirstLine)
