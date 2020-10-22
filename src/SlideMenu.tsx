import React from 'react'
import {Box} from "@material-ui/core"
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card'
import {Editor} from "./entities/Editor"

export default function SlideMenu(editor: Editor) {
    let slides = editor.presentation.slides.map(item =>
        <Card className={"mb-3"}>
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title
                </Card.Text>
            </Card.Body>
        </Card>)
    return (
        <Box className="sidebar" px={"1rem"} overflow={"auto"} maxHeight={"calc(100vh - 100px - 1rem)"}>
            { slides }
            <hr/>
        </Box>
    )
}
