import React from 'react'
import './App.css'
import NavbarApp from './Nav'
import SlideArea from './SlideArea'
import SlideMenu from "./SlideMenu";
import {Editor} from "./entities/Editor";

function App() {
    let editor: Editor = {
        presentation: {
            name: 'test',
            slides: []
        },
        selectionSlidesId: [0]
    }
    return (
        <div className="wrapper">
            <NavbarApp />
            <div className="main-block">
                <SlideMenu{...editor} />
                <SlideArea />
            </div>
        </div>
    )
}

export default App;
