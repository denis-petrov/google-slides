import React from 'react'
import './App.css'
import NavbarApp from './Nav'
import SlideArea from './SlideArea'
import SlideMenu from './SlideMenu'
import {Editor} from './entities/Editor'

function App(editor: Editor) {
    return (
        <div className="wrapper">
            <NavbarApp{...editor} />
            <div className="main-block">
                <SlideMenu{...editor} />
                <SlideArea />
            </div>
        </div>
    )
}

export default App;
