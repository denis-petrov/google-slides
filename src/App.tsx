import React, {Dispatch} from 'react'
import './App.css'
import Nav from './nav/Nav'
import SlideArea from './slideArea/SlideArea'
import SlideMenu from './slideMenu/SlideMenu'
import SlideShowPanel from './slideShowPanel/SlideShowPanel'
import {connect} from "react-redux"
import {initialState} from "./store/localStorage"
import {Editor} from "./entities/Editor"
import {canRedo, canUndo, canUndoKeyboard} from "./store/stateHistory"
import {useDragAndDrop} from "./customHooks/useDragAndDrop"
import {useEventListener} from "./customHooks/useEventListner"
import {useMobileViewOnLoad} from "./customHooks/useMobileViewOnLoad"
import {DELETE_ELEMENTS, REDO, SET_EDITOR, UNDO} from "./store/actionTypes"


const mapStateToProps = (state: Editor) => {
    return {
        state: state
    }
}


const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        setEditor: (state: Editor = initialState) => dispatch({type: SET_EDITOR, payload: state}),
        undo: () => dispatch({type: UNDO}),
        redo: () => dispatch({type: REDO}),
        deleteElements: () => dispatch({type: DELETE_ELEMENTS}),
    }
}


function App(props: any) {
    if (Object.keys(props.state).length === 0) {
        props.setEditor()
    }

    let handleUndoRedo = (evt: KeyboardEvent) => {
        if (evt.ctrlKey && evt.shiftKey && evt.keyCode === 90) {
            if (canRedo()) {
                props.redo()
            }
        } else if (canUndoKeyboard(evt)) {
            if (canUndo()) {
                props.undo()
            }
        }

        if (evt.keyCode === 46) {
            props.deleteElements()
        }
    }

    useDragAndDrop(props.state)
    useMobileViewOnLoad()

    useEventListener('keydown', handleUndoRedo)

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


export default connect(mapStateToProps, mapDispatchToProps)(App)
