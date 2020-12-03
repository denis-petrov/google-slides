import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft"
import {showLastSlide, showNextSlide, stopShowPresentation} from "../functions/showPresentation"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import PauseIcon from "@material-ui/icons/Pause"
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight"
import React from "react"
import {slideShow} from "./slideShow"
import {getEditor} from "../stateManager/StateManager";


export default function SlideShowPanel() {
    let editor = getEditor()
    let slidesNumber = 1
    editor.presentation.slides.map(s => {
        if (s.id === editor.selectionSlidesId[0]) {
            slidesNumber = editor.presentation.slides.indexOf(s) + 1
        }
    })

    return (
        <div id='slide-mask'>
            <div className='presentation_panel'>
                <div>Slide {slidesNumber}</div>
                <KeyboardArrowLeftIcon onClick={(evt) => {
                    showLastSlide(evt)
                }}/>
                <PlayArrowIcon id='start_slide_show' onClick={(evt) => {
                    slideShow(evt, false)
                }}/>
                <PauseIcon id='stop_slide_show' style={{display: 'none'}} onClick={(evt) => {
                    slideShow(evt, true)
                }}/>
                <KeyboardArrowRightIcon onClick={(evt) => {
                    showNextSlide(evt)
                }}/>
                <div onClick={(evt) => {slideShow(evt,true); stopShowPresentation()}}>Close</div>
            </div>
        </div>
    )
}