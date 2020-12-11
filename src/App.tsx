import React from 'react'
import './App.css'
import Nav from './nav/Nav'
import SlideArea from './slideArea/SlideArea'
import SlideMenu from './slideMenu/SlideMenu'
import SlideShowPanel from './slideShowPanel/SlideShowPanel'
import {useDragAndDrop} from "./useDragAndDrop"
import {reDo, unDo} from "./stateManager/StateManager"


export default function App() {
    useDragAndDrop()

    window.addEventListener('keydown', (evt: KeyboardEvent) => {
        if (evt.ctrlKey && evt.shiftKey && evt.keyCode === 90) {
            reDo()
        } else if (evt.ctrlKey && evt.keyCode === 90) {
            unDo()
        }
    })

    return (
        <div className="wrapper">
            <Nav />
            <div className="main-block">
                <SlideMenu />
                <SlideArea />
                <SlideShowPanel />
            </div>
        </div>
    )
}

