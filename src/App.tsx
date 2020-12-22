import React, {Dispatch} from 'react'
import './App.css'
import Nav from './nav/Nav'
import SlideArea from './slideArea/SlideArea'
import SlideMenu from './slideMenu/SlideMenu'
import SlideShowPanel from './slideShowPanel/SlideShowPanel'
import {useDragAndDrop} from "./useDragAndDrop"
import {useDispatch} from "react-redux"
import {WHITE} from "./entities/Constants"
import {v4 as uuidv4} from "uuid"
import {store} from "./store/store"
/*import {stateHistory} from "./store/stateHistory"*/


export default function App() {
    const dispatch: Dispatch<any> = useDispatch()

    useDragAndDrop()

    /*window.addEventListener('keydown', (evt: KeyboardEvent) => {
        if (evt.ctrlKey && evt.shiftKey && evt.keyCode === 90) {
            if (stateHistory.index < stateHistory.history.length - 1) {
                dispatch({type: 'REDO'})
            }
        } else if (evt.ctrlKey && evt.keyCode === 90) {
            if (stateHistory.index > 0) {
                dispatch({type: 'UNDO'})
            }
        }
    })*/

    let ed = store.getState()
    let firstSlideId = uuidv4()
    if (Object.keys(ed).length == 0) {
        dispatch({
            type: 'SET_EDITOR', payload: {
                presentation: {
                    name: '',
                    slides: [
                        {
                            id: firstSlideId,
                            selectionElementsId: [],
                            elements: [],
                            background: WHITE
                        }
                    ]
                },
                selectionSlidesId: [firstSlideId]
            }
        })
    }

    return (
        <div className="wrapper">
            <Nav/>
            <div className="main-block">
                <SlideMenu/>
                <SlideArea/>
                <SlideShowPanel/>
            </div>
        </div>
    )
}

