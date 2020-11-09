import jsPDF from 'jspdf'
import {getEditor} from "../stateManager/StateManager";
import {Editor} from "../entities/Editor";
import Canvg from 'canvg'

export async function createPdf() {
    let editor: Editor = getEditor()
    let allElementIndexes = editor.presentation.slides.map(s => s.id)

    let doc = new jsPDF('p', 'pt', 'a4');
    for (let i = 0; i < allElementIndexes.length; i++) {
        let currSlideUuid = allElementIndexes[i]

        var svg = (document.querySelector(`#slide${currSlideUuid} > .card > svg`) as Element).innerHTML;

        if (svg)
            svg = svg.replace(/\r?\n|\r/g, '').trim();
        let canvas = document.createElement('canvas') as HTMLCanvasElement;
        let canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D;
        await Canvg.from(canvasContext, svg);
        let imgData = canvas.toDataURL('image/png');
        // Generate PDF
        doc.addImage(imgData, 'PNG', 40, 40, 75, 75);
        doc.save('test.pdf');
    }
}