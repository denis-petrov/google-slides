import React from 'react'
import './App.css'
import NavbarApp from './nav/Nav'
import SlideArea from './slideArea/SlideArea'
import SlideMenu from './slideMenu/SlideMenu'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import {showLastSlide, showNextSlide, stopShowPresentation} from "./functions/showPresentation";

let timer = false
let timerId: any

function slideShow(evt: any) {
    let playBtn = document.getElementById('start_slide_show') as HTMLElement
    let stopBtn = document.getElementById('stop_slide_show') as HTMLElement
    if (timer) {
        playBtn.style.display = ''
        stopBtn.style.display = 'none'
        clearInterval(timerId)
        timer = false
    } else {
        playBtn.style.display = 'none'
        stopBtn.style.display = ''
        timerId = setInterval((evt) => {
            showNextSlide(evt)
        }, 3000)
        timer = true
    }
}

function App() {
    return (
        <div className="wrapper">
            <NavbarApp />
            <div className="main-block">
                <SlideMenu />
                <SlideArea />
                <div id='slide-mask'>
                    <div className='presentation_panel'>
                        <KeyboardArrowLeftIcon onClick={(evt) => {showLastSlide(evt)}}/>
                        <PlayArrowIcon id='start_slide_show' onClick={(evt) => {slideShow(evt)}}/>
                        <PauseIcon id='stop_slide_show' style={{display: 'none'}} onClick={(evt) => {slideShow(evt)}}/>
                        <KeyboardArrowRightIcon onClick={(evt) => {showNextSlide(evt)}}/>
                        <span onClick={stopShowPresentation}>Close</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;
