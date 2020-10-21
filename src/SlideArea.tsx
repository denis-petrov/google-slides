import React from 'react'
import Paper from '@material-ui/core/Paper'
import './slideArea.css'

export default function SlideArea() {

    return (
        <div id="slide-area" className='slide-area'>
            <Paper className="workspace" elevation={5} />
        </div>
    );
}