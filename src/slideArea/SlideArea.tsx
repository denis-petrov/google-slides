import React from 'react'
import './slideArea.css'
import {getEditor} from "../stateManager/StateManager";
import {ElementType} from "../entities/Elements";

export default function SlideArea() {
    let editor = getEditor();
    // eslint-disable-next-line array-callback-return
    let elements = editor.presentation.slides.map(s => {
        if (editor.selectionSlidesId.includes(s.id)) {
            // eslint-disable-next-line array-callback-return
            return s.elements.map(e => {
                if (e.type === ElementType.rectangle) {
                    return <rect x={e.topLeftPoint.x} y={e.topLeftPoint.y} width="100" height="100" key={e.id} id={'slide_' + s.id + '_element_' + e.id}/>
                } else if (e.type === ElementType.ellipse) {
                    return <ellipse rx="100" ry="100" cx={e.topLeftPoint.x} cy={e.topLeftPoint.y} fill="gold" stroke="orange" key={e.id} id={'slide_' + s.id + '_element_' + e.id} />
                }
            })
        }
    });

    return (
        <div id="slide-area" className='slide-area'>
            <svg className={'workspace'}>
                { elements }
            </svg>
        </div>
    );
}