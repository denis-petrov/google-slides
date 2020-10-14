import React from 'react'
import {AppBar, Toolbar, Typography} from "@material-ui/core"
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {Dropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NavbarApp() {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <AppBar position="static" className="nav_bar">
                <Toolbar variant="dense">
                    <img src="/nav__logo.png" alt="nav__logo" className="nav__file_icon" />
                    <div className="nav__wrap">
                        <Typography variant="body1" className="nav__presentation_name">
                            PRESENTATION NAME
                        </Typography>
                        {/*<div className="nav__menu">
                            <div className="nav__menu_button">
                                <Button aria-controls="nav-menu-file" aria-haspopup="true" onClick={handleClick} id="nav-menu-file" >
                                    File
                                </Button>
                                <Menu
                                    id="nav-menu-file"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    className="nav__menu_dropbox"
                                >
                                    <MenuItem onClick={handleClose}>Open</MenuItem>
                                    <MenuItem onClick={handleClose}>Export</MenuItem>
                                    <MenuItem onClick={handleClose}>Save</MenuItem>
                                </Menu>
                            </div>

                            <div className="nav__menu_button">
                                <Button aria-controls="nav-menu-insert" aria-haspopup="true" onClick={handleClick} id="nav-menu-insert">
                                    Insert
                                </Button>
                                <Menu
                                    id="nav-menu-insert"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    className="nav__menu_dropbox"
                                >
                                    <MenuItem onClick={handleClose}>Text</MenuItem>
                                    <MenuItem onClick={handleClose}>Triangle</MenuItem>
                                    <MenuItem onClick={handleClose}>Rectangle</MenuItem>
                                    <MenuItem onClick={handleClose}>Ellipse</MenuItem>
                                    <MenuItem onClick={handleClose}>Image</MenuItem>
                                </Menu>
                            </div>

                            <div className="nav__menu_button" id="nav-menu-slide">
                                <Button aria-controls="nav-menu-slide" aria-haspopup="true" onClick={handleClick} id="nav-menu-slide">
                                    Slide
                                </Button>
                                <Menu
                                    id="nav-menu-slide"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    className="nav__menu_dropbox"
                                >
                                    <MenuItem onClick={handleClose} id="nav-menu-slide">New slide</MenuItem>
                                    <MenuItem onClick={handleClose} id="nav-menu-slide">Delete slide</MenuItem>
                                </Menu>
                            </div>
                        </div>*/}
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Dropdown Button
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </div>
                </Toolbar>
            </AppBar>
            <hr/>
        </div>
    )
}