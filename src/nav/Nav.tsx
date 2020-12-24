import React, {ChangeEvent, Dispatch} from 'react'
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
import {savePresentationToPc} from '../functions/savePresentationToPc'
import {openPresentationFromPc} from '../functions/openPresentationFromPc'
import {DEFAULT_ELLIPSE, DEFAULT_RECTANGLE, DEFAULT_TEXT, DEFAULT_TRIANGLE} from "../entities/Constants"
import {Editor} from "../entities/Editor"
import {insertImageFromPc} from "../functions/insertImageFromPc"
import FormDialog from "./FomDialog"
import ColorPickerOur from "./ColorPicker"
import {createPdf} from "../functions/createPdf"
import ColorPicker from "react-pick-color"
import {getSelectedElement} from "../functions/getSelectedElement"
import {ElementType, Text} from "../entities/Elements"
import {showPresentation} from "../functions/showPresentation"
import {connect, useDispatch} from "react-redux"
import {initialState} from "../store/localStorage"
import {
    ADD_ELEMENT,
    ADD_EMPTY_SLIDE, CHANGE_ELEMENT_BORDER_COLOR, CHANGE_ELEMENT_BORDER_WIDTH, CHANGE_ELEMENT_FILL_COLOR,
    CHANGE_PRESENTATION_NAME, CHANGE_TEXT_BOLD, CHANGE_TEXT_FONT, CHANGE_TEXT_ITALIC, CHANGE_TEXT_SIZE,
    DELETE_ELEMENTS, DELETE_SLIDES, REDO,
    SET_EDITOR, UNDO
} from "../store/actionTypes"


const fileField = React.createRef<HTMLInputElement>()
const imageFiled = React.createRef<HTMLInputElement>()
const imageToBackFiled = React.createRef<HTMLInputElement>()


const mapStateToProps = (state: Editor) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        changePresentationName: (newName: string) => dispatch({type: CHANGE_PRESENTATION_NAME, payload: newName}),
        setEditor: (state: Editor) => dispatch({type: SET_EDITOR, payload: state}),
        openPresentationFromPc: (e: ChangeEvent<HTMLInputElement>) => openPresentationFromPc(e, dispatch),

        addTriangle: () => dispatch({type: ADD_ELEMENT, payload: DEFAULT_TRIANGLE}),
        addEllipse: () => dispatch({type: ADD_ELEMENT, payload: DEFAULT_ELLIPSE}),
        addRectangle: () => dispatch({type: ADD_ELEMENT, payload: DEFAULT_RECTANGLE}),
        addText: () => dispatch({type: ADD_ELEMENT, payload: DEFAULT_TEXT}),
        deleteElements: () => dispatch({type: DELETE_ELEMENTS}),

        addEmptySlide: () => dispatch({type: ADD_EMPTY_SLIDE}),
        deleteSlides: () => dispatch({type: DELETE_SLIDES}),

        undo: () => dispatch({type: UNDO}),
        redo: () => dispatch({type: REDO}),

        changeElementBorderColor: (data: string) => dispatch({type: CHANGE_ELEMENT_BORDER_COLOR, payload: data}),
        changeElementFillColor: (data: string) => dispatch({type: CHANGE_ELEMENT_FILL_COLOR, payload: data}),
        changeElementBorderWidth: (data: string) => dispatch({type: CHANGE_ELEMENT_BORDER_WIDTH, payload: data}),
        changeTextBold: () => dispatch({type: CHANGE_TEXT_BOLD}),
        changeTextItalic: () => dispatch({type: CHANGE_TEXT_ITALIC}),
        changeTextUnderline: () => dispatch({type: CHANGE_TEXT_ITALIC}),
        changeTextFont: (data: string) => dispatch({type: CHANGE_TEXT_FONT, payload: data}),
        changeTextSize: (data: string) => dispatch({type: CHANGE_TEXT_SIZE, payload: data})
    }
}

function Nav(props: any) {
    let editor = props.state
    const dispatch: Dispatch<any> = useDispatch()

    const elem = getSelectedElement()
    let fillColor: string = ''
    let borderColor: string = ''
    let borderSizeView: string = ''
    let font: string = ''
    let fontSize: number = 10
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
                                       value={editor.presentation.name}
                                       onChange={(e) =>
                                           props.changePresentationName(e.target.value)
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
                                        <Dropdown.Item className="btn-sm button__onclick"
                                                       onClick={() => props.setEditor(initialState)}>
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
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Dropdown>
                                    <Dropdown.Toggle className="btn-light btn-sm dropbox__insert dropbox__button"
                                                     variant="success" id="dropdown-insert">
                                        Insert
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item className="btn-sm button__onclick"
                                                       onClick={() => props.addTriangle}>
                                            Triangle
                                        </Dropdown.Item>
                                        <Dropdown.Item className="btn-sm button__onclick"
                                                       onClick={() => props.addEllipse}>
                                            Ellipse
                                        </Dropdown.Item>
                                        <Dropdown.Item className="btn-sm button__onclick"
                                                       onClick={() => props.addRectangle}>
                                            Rectangle
                                        </Dropdown.Item>
                                        <Dropdown.Item className="btn-sm button__onclick"
                                                       onClick={() => props.addText}>
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
                                        <Dropdown.Item className="btn-sm button__onclick"
                                                       onClick={() => props.addEmptySlide}>
                                            New slide
                                        </Dropdown.Item>
                                        <Dropdown.Item className="btn-sm button__onclick"
                                                       onClick={() => props.deleteSlides}>
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
                                onClick={() => showPresentation(editor)}>
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
                                                   props.setEditor({
                                                       ...editor,
                                                       selectionSlidesId: [editor.presentation.slides[0].id]
                                                   })
                                                   showPresentation(editor)
                                               }}>
                                    From first slide
                                </Dropdown.Item>
                                <Dropdown.Item className="btn-sm button__onclick"
                                               onClick={() => showPresentation(editor)}>
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
                    <button type="button" className="btn btn-sm button__onclick dropbox__button"
                            onClick={() => props.addEmptySlide()}>
                        <AddIcon/>
                    </button>

                    <button type="button" className="btn btn-sm button__onclick dropbox__button"
                            onClick={() => props.deleteSlides()}>
                        <RemoveIcon/>
                    </button>

                    <button type="button" className="btn btn-light btn-sm button__onclick dropbox__button"
                            onClick={() => props.undo()}>
                        <UndoIcon/>
                    </button>

                    <button type="button" className="btn btn-light btn-sm button__onclick dropbox__button"
                            onClick={() => props.redo()}>
                        <RedoIcon/>
                    </button>

                    <div className="vertical_separator">&nbsp;</div>

                    <button type="button" className="btn btn-light btn-sm button__onclick dropbox__button"
                            onClick={() => props.addTriangle()}>
                        <ChangeHistoryIcon/>
                    </button>

                    <button type="button" className="btn btn-light btn-sm button__onclick dropbox__button"
                            onClick={() => props.addEllipse()}>
                        <RadioButtonUncheckedIcon/>
                    </button>

                    <button type="button" className="btn btn-light btn-sm button__onclick dropbox__button"
                            onClick={() => props.addRectangle()}>
                        <CheckBoxOutlineBlankIcon/>
                    </button>

                    <button type="button" className="btn btn-light btn-sm button__onclick dropbox__button"
                            onClick={() => props.addText()}>
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
                                            insertImageFromPc(e, 'ADD_ELEMENT', dispatch)

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
                                <ColorPickerOur dispatch={dispatch}/>
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
                                            insertImageFromPc(e, 'ADD_IMAGE_TO_BACKGROUND', dispatch)

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
                            className="btn btn-sm button__onclick dropbox__button hidden" onClick={() =>
                        props.deleteElements()
                    }>
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
                            <ColorPicker color={fillColor} onChange={(color) =>
                                props.changeElementFillColor(color.hex)
                            } hideAlpha={true} hideInputs={true}/>
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
                            <ColorPicker color={borderColor} onChange={(color) =>
                                props.changeElementBorderColor(color.hex)
                            } hideAlpha={true} hideInputs={true}/>
                        </Dropdown.Menu>
                    </Dropdown>

                    {/*Border size*/}
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
                            onChange={(e) =>
                                props.changeElementBorderWidth(e.target.value)
                            }
                        />
                    </div>

                    {/*separator*/}
                    <div id="edit_style_text_sep_2" className="vertical_separator hidden">&nbsp;</div>

                    {/*bold text*/}
                    <button id="edit_style_text_bold" type="button"
                            className="btn btn-sm button__onclick dropbox__button hidden" onClick={() =>
                        props.changeTextBold()
                    }>
                        <FormatBoldRoundedIcon/>
                    </button>

                    {/*italic text*/}
                    <button id="edit_style_text_italic" type="button"
                            className="btn btn-sm button__onclick dropbox__button hidden" onClick={() =>
                        props.changeTextItalic()
                    }>
                        <FormatItalicRoundedIcon/>
                    </button>

                    {/*italic text*/}
                    <button id="edit_style_text_underline" type="button"
                            className="btn btn-sm button__onclick dropbox__button hidden" onClick={() =>
                        props.changeTextUnderline()
                    }>
                        <FormatUnderlinedIcon/>
                    </button>

                    {/*separator 2*/}
                    <div id="edit_style_text_sep_3" className="vertical_separator hidden">&nbsp;</div>

                    {/*font*/}
                    <Dropdown id="edit_style_text_font" className="hidden">
                        <Dropdown.Toggle className="btn-light btn-sm btn button__onclick dropbox__button"
                                         variant="success" id="dropdown-slide">
                            <div id="font_text" className="edit_style_text__font">{font} <ArrowDropDownRoundedIcon/>
                            </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item className="btn-sm button__onclick edit_style_text__time_new_roman"
                                           onClick={() =>
                                               props.changeTextFont('Times New Roman')
                                           }>
                                Times New Roman
                            </Dropdown.Item>
                            <Dropdown.Item className="btn-sm button__onclick edit_style_text__roboto" onClick={() =>
                                props.changeTextFont('Roboto')
                            }>
                                Roboto
                            </Dropdown.Item>
                            <Dropdown.Item className="btn-sm button__onclick edit_style_text__arial" onClick={() =>
                                props.changeTextFont('Arial')
                            }>
                                Arial
                            </Dropdown.Item>
                            <Dropdown.Item className="btn-sm button__onclick edit_style_text__cambria" onClick={() =>
                                props.changeTextFont('Cambria')
                            }>
                                Cambria
                            </Dropdown.Item>
                            <Dropdown.Item className="btn-sm button__onclick edit_style_text__samanata" onClick={() =>
                                props.changeTextFont('Samanata')
                            }>
                                Samanata
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    {/*separator*/}
                    <div id="edit_style_text_sep_4" className="vertical_separator hidden">&nbsp;</div>

                    {/*Font size*/}
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
                            onChange={(e) =>
                                props.changeTextSize(e.target.value)
                            }
                        />
                    </div>

                </Toolbar>
            </AppBar>
            <hr className="second_nav__hr"/>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
