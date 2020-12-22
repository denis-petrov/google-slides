import React, {Dispatch} from 'react'
import './App.css'
import Nav from './nav/Nav'
import SlideArea from './slideArea/SlideArea'
import SlideMenu from './slideMenu/SlideMenu'
import SlideShowPanel from './slideShowPanel/SlideShowPanel'
import {useDragAndDrop, useEventListener} from "./useDragAndDrop"
import {connect} from "react-redux"
import {initialState} from "./store/localStorage"
import {Editor} from "./entities/Editor";
import {canRedo, canUndo, canUndoKeyboard} from "./store/stateHistory"


const mapStateToProps = (state: Editor) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        setEditor: () => dispatch({type: 'SET_EDITOR', payload: initialState}),
        undo: () => dispatch({type: 'UNDO'}),
        redo: () => dispatch({type: 'REDO'}),
    }
}

function App(props: any) {
    if (Object.keys(props.state).length == 0) {
        props.setEditor()
    }

    useDragAndDrop()

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
    }

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
