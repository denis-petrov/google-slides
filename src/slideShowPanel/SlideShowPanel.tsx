import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft"
import {showLastSlide, showNextSlide, stopShowPresentation} from "../functions/showPresentation"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import PauseIcon from "@material-ui/icons/Pause"
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight"
import React from "react"
import {slideShow} from "./slideShow"


export default function SlideShowPanel() {
    return (
        <div id='slide-mask'>
            <div className='presentation_panel'>
                <KeyboardArrowLeftIcon onClick={(evt) => {
                    showLastSlide(evt)
                }}/>
                <PlayArrowIcon id='start_slide_show' onClick={() => {
                    slideShow(false)
                }}/>
                <PauseIcon id='stop_slide_show' style={{display: 'none'}} onClick={() => {
                    slideShow(true)
                }}/>
                <KeyboardArrowRightIcon onClick={(evt) => {
                    showNextSlide(evt)
                }}/>
                <span onClick={() => {slideShow(true); stopShowPresentation()}}>Close</span>
            </div>
        </div>
    )
}