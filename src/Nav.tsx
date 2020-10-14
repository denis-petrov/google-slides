import React from 'react'
import {AppBar, Toolbar, Typography} from "@material-ui/core"
import {Dropdown} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Nav() {
    return (
        <div>
            <AppBar position="static" className="nav_bar">
                <Toolbar variant="dense">
                    <img src="/nav__logo.png" alt="nav__logo" className="nav__file_icon" />

                    <div className="container-fluid">
                        <div className="row">
                            <input type="email" className="form-control nav__presentation_name" id="exampleInputEmail1"
                                   aria-describedby="emailHelp" placeholder="PRESENTATION NAME"/>
                            {/*<Typography variant="body1" className="nav__presentation_name">
                                PRESENTATION NAME
                            </Typography>*/}
                        </div>
                        <div className="row nav__menu_dropbox">
                            <Dropdown>
                                <Dropdown.Toggle className="nav__menu_dropbox_file btn-light" variant="success" id="dropdown-file">
                                    File
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Open</Dropdown.Item>
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

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">New slide</Dropdown.Item>
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