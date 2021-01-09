import {Editor} from "../entities/Editor"
import React, {Dispatch} from "react"
import {connect} from "react-redux"
import {Dropdown} from "react-bootstrap"
import {SET_EDITOR} from "../store/actionTypes"
import {showPresentation} from "../functions/showPresentation"
import SlideshowRoundedIcon from "@material-ui/icons/SlideshowRounded"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"


const mapStateToProps = (state: Editor) => {
    return {
        state: state,
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        setEditor: (state: Editor) => dispatch({type: SET_EDITOR, payload: state})
    }
}


function NavShow(props: any) {
    let editor = props.state

    return (
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
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavShow)
