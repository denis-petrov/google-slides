import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import PauseIcon from "@material-ui/icons/Pause"
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight"
import React, {Dispatch} from "react"
import {slideShow} from "./slideShow"
import {connect, useDispatch} from "react-redux"
import {Editor} from "../entities/Editor"
import {changeTextCursor} from "../functions/changeTextCursor"
import {changeWorkspaceSize} from "../functions/changeWorkspaceSize"
import {showNextSlide} from "./showNextSlide"
import {showSlideShowPanel} from "./showSlideShowPanel"
import {getIsShowCurrentlyPresentation} from "../functions/showPresentation"
import {stopShowPresentation} from "./stopShowPresentation"
import {showPrevSlide} from "./showPrevSlide"
import {changeSlideSize} from "./changeSlideSize"
import {useEventListener} from "../customHooks/useEventListner"


const mapStateToProps = (state: Editor) => {
    return {
        state: state
    }
}

function SlideShowPanel(props: any) {
    let editor = props.state
    const dispatch: Dispatch<any> = useDispatch()

    let slidesNumber = 1
    let slidesCount = editor.presentation.slides.length
    editor.presentation.slides.forEach((s: any) => {
        if (s.id === editor.selectionSlidesId[0]) {
            slidesNumber = editor.presentation.slides.indexOf(s) + 1
        }
    })

    let handleResize = () => {
        if (getIsShowCurrentlyPresentation()) {
            changeSlideSize()
        } else {
            changeWorkspaceSize()
        }
    }
    useEventListener('resize', handleResize)
    useEventListener('DOMContentLoaded', handleResize)

    let handleKeyDown = (evt: KeyboardEvent) => {
        if (evt.keyCode === 27) {
            slideShow(editor, dispatch, evt, true)
            stopShowPresentation()
        }

        if (getIsShowCurrentlyPresentation()) {
            if (evt.keyCode === 39) {
                showNextSlide(editor, dispatch)
            }

            if (evt.keyCode === 37) {
                showPrevSlide(editor, dispatch)
            }
        }
    }
    useEventListener('keydown', handleKeyDown)

    let handleMouseMove = (evt: MouseEvent) => {
        document.documentElement.style.cursor = ''
        showSlideShowPanel(evt)
        changeTextCursor(evt)
    }
    useEventListener('mousemove', handleMouseMove)

    return (
        <div id='slide-mask'>
            <div id="loading-circle" className="lds-roller-block">
                <div className="lds-roller">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
                <div className="loading_msg">Please, wait</div>
            </div>
            <div className='presentation_panel'>
                <div>Slide {slidesNumber} / {slidesCount}</div>
                <KeyboardArrowLeftIcon id='show-prev-slide' onClick={() =>
                    showPrevSlide(editor, dispatch)
                }/>
                <PlayArrowIcon id='start-slide-show' onClick={(evt) => {
                    let timer = slidesNumber === slidesCount
                    slideShow(editor, dispatch, evt, timer)
                }}/>
                <PauseIcon id='stop-slide-show' style={{display: 'none'}} onClick={(evt) => {
                    slideShow(editor, dispatch, evt, true)
                }}/>
                <KeyboardArrowRightIcon id='show-next-slide' onClick={() =>
                    showNextSlide(editor, dispatch)
                }/>
                <div id='close-show-presentation' onClick={(evt) => {
                    slideShow(editor, dispatch, evt, true)
                    stopShowPresentation()
                }}>Close
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(SlideShowPanel)