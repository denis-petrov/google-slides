import React from 'react'
import {AppBar, Toolbar, Typography} from '@material-ui/core'
import {Dropdown} from 'react-bootstrap'

export default function Nav() {
    return (
        <div>
            <AppBar position="static" className="nav_bar">
                <Toolbar variant="dense">
                    <img src="/nav__logo.png" alt="nav__logo" className="nav__file_icon" />
                    <div className="nav__wrap">
                        <Typography variant="body1" className="nav__presentation_name">
                            PRESENTATION NAME
                        </Typography>

                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                File
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Open</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Export</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Save</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </div>
                </Toolbar>
            </AppBar>
            <hr/>
        </div>
    )
}