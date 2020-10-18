import React from 'react'
import {Box} from "@material-ui/core"
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card'
import {Editor} from "./entities/Editor"

export default function SlideMenu(editor: Editor) {
    return (
        <Box className="sidebar" px={"1rem"} overflow={"auto"} maxHeight={"calc(100vh - 100px - 1rem)"}>
            <Card className={"mb-3 slidemenu__card"}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className={"mb-3"}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className={"mb-3"}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className={"mb-3"}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className={"mb-3"}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className={"mb-3"}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className={"mb-3"}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title
                    </Card.Text>
                </Card.Body>
            </Card>
            <hr/>
        </Box>
    )
}
