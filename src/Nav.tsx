import React from 'react'
import {AppBar, Toolbar} from "@material-ui/core"
import {Dropdown, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {addEmptySlide} from "./functions/addEmptySlide";
import {Editor} from "./entities/Editor";


function submitFile(file: FileList) {
    let fileReader = new FileReader()
    fileReader.onload = () => console.log(fileReader.result)
    console.log(file)
}

let emptyEditor = {
    presentation: {
        name: 'test',
        slides: []
    },
    selectionSlidesId: [0]
}

export default function Nav() {
    return (
        <div>
            <AppBar position="static" className="nav_bar">
                <Toolbar variant="dense">
                    <img src="/nav__logo.png" alt="nav__logo" className="nav__file_icon" />

                    <div className="container-fluid">
                        <div className="row">
                            <input type="text" className="form-control nav__presentation_name" id="exampleInputEmail1"
                                   aria-describedby="emailHelp" placeholder="PRESENTATION NAME"/>
                        </div>
                        <div className="row nav__menu_dropbox">
                            <Dropdown>
                                <Dropdown.Toggle className="nav__menu_dropbox_file btn-light" variant="success" id="dropdown-file">
                                    File
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <div>
                                        <label htmlFor="myfile" className="nav__menu_data">Open</label>
                                        {/*<input type="file" className="nav__my_file" id="file" name="file"
                                               accept=".json" onChange={e => console.log(e)} />*/}
                                        <input type="file" className="nav__my_file" id="myfile" name="myfile" accept=".json"  onChange={e => console.log(e)}/>
                                    </div>

                                    <Dropdown.Item href="#/action-2">Save</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Export</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown>
                                <Dropdown.Toggle className="nav__menu_dropbox_insert btn-light" variant="success" id="dropdown-insert">
                                    Insert
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Text</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Triangle</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Rectangle</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Ellipse</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Image</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown>
                                <Dropdown.Toggle className="nav__menu_dropbox_slide btn-light" variant="success" id="dropdown-slide">
                                    Slide
                                </Dropdown.Toggle>

                                <button onClick={(e) => addEmptySlide(emptyEditor)}>slide</button>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1" >New slide</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Delete slide</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <hr/>
        </div>
    )
}
