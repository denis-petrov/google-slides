import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft"
import {
    changeSlideSize,
    isShowCurrentlyPresentation,
    showNextSlide,
    showPrevSlide,
    showSlideShowPanel,
    stopShowPresentation
} from "../functions/showPresentation"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import PauseIcon from "@material-ui/icons/Pause"
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight"
import React, {Dispatch} from "react"
import {slideShow} from "./slideShow"
import {connect, useDispatch} from "react-redux"
import {Editor} from "../entities/Editor"
import {changeTextCursor} from "../functions/changeTextCursor"
import {changeWorkspaceSize} from "../functions/changeWorkspaceSize"


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
    editor.presentation.slides.map((s: any) => {
        if (s.id === editor.selectionSlidesId[0]) {
            slidesNumber = editor.presentation.slides.indexOf(s) + 1
        }
    })

    window.addEventListener('resize', () => {
        if (isShowCurrentlyPresentation) {
            changeSlideSize()
        } else {
            changeWorkspaceSize()
        }
    })

    window.addEventListener('keydown', (evt: KeyboardEvent) => {
        if (evt.keyCode === 27) {
            slideShow(editor, dispatch, evt,true)
            stopShowPresentation()
        }

        if (isShowCurrentlyPresentation) {
            if (evt.keyCode === 39) {
                showNextSlide(editor, dispatch)
            }

            if (evt.keyCode === 37) {
                showPrevSlide(editor, dispatch)
            }
        }
    })

    window.addEventListener('mousemove', (evt) => {
        document.documentElement.style.cursor = ''
        showSlideShowPanel(evt)
        changeTextCursor(evt)
    })

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
                <KeyboardArrowLeftIcon id='show-prev-slide' onClick={(evt) =>
                    showPrevSlide(editor, dispatch)
                }/>
                <PlayArrowIcon id='start-slide-show' onClick={(evt) => {
                    let timer = slidesNumber === slidesCount
                    slideShow(editor, dispatch, evt, timer)
                }}/>
                <PauseIcon id='stop-slide-show' style={{display: 'none'}} onClick={(evt) => {
                    slideShow(editor, dispatch, evt, true)
                }}/>
                <KeyboardArrowRightIcon id='show-next-slide' onClick={(evt) =>
                    showNextSlide(editor, dispatch)
                }/>
                <div onClick={(evt) => {
                    slideShow(editor, dispatch, evt, true)
                    stopShowPresentation()
                }}>Close
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(SlideShowPanel)