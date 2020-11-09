import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import SearchRoundedIcon from "@material-ui/icons/SearchRounded"
import {insertImageByURL} from "../functions/insertImageByURL"
import {addToBackground} from "../functions/addToBackground"
import {addElement} from "../functions/addElement"

export default function FormDialog(props: any) {
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    let isBackground = props.isBackground

    let userURL: string

    window.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.keyCode === 13) {
            insertImageByURL(userURL, addElement)
            handleClose()
        }
    })

    return (
        <>
            <div onClick={handleClickOpen}>
                <label className="btn-sm button__onclick dropbox_image__item
                                    dropbox_image__item_no_bottom_margin">
                    <SearchRoundedIcon /> Insert by URL
                </label>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Insert by URL</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                            To insert image by URL , please enter your URL here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="URL"
                        type="text"
                        fullWidth
                        onChange={(e) => (userURL = e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={
                        () => {
                            if (isBackground) {
                                insertImageByURL(userURL, addToBackground)
                                handleClose()
                            } else {
                                insertImageByURL(userURL, addElement)
                                handleClose()
                            }
                        }
                    } color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}