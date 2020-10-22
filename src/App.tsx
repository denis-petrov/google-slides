import React, { useState } from 'react';
import './App.css'
import NavbarApp from './Nav'
import SlideArea from './SlideArea'
import SlideMenu from "./SlideMenu";
import {Editor} from "./entities/Editor";
import {Slide} from "./entities/Slide";
import {WHITE} from "./entities/Constants";

function App() {
    const [editorState, setEditorState] = useState<Editor>({presentation: {
            name: 'test',
            slides: [
                {
                    id: 0,
                    background: WHITE,
                    elements: [],
                    selectionElementsId: []
                }
            ]
        },
        selectionSlidesId: [0]});
    return (
        <div className="wrapper">
            <NavbarApp{...editorState}{...setEditorState}/>
            <div className="main-block">
                <SlideMenu{...editorState} />
                <SlideArea />
            </div>
        </div>
    )
}

export default App;
