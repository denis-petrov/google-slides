import React from 'react'
import {AppBar, Toolbar, Typography} from "@material-ui/core"
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'


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
                        <div className="nav__menu">
                            <div className="nav__menu_button">
                                <Button aria-controls="nav-menu-file" aria-haspopup="true" onClick={handleClick} >
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
                                <Button aria-controls="nav-menu-insert" aria-haspopup="true" onClick={handleClick}>
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

                            <div className="nav__menu_button">
                                <Button aria-controls="nav-menu-slide" aria-haspopup="true" onClick={handleClick} >
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
                                    <MenuItem onClick={handleClose}>New slide</MenuItem>
                                    <MenuItem onClick={handleClose}>Delete slide</MenuItem>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <hr/>
        </div>
    )
}