import React, {Dispatch} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import SearchRoundedIcon from "@material-ui/icons/SearchRounded"
import {insertImageByURL} from "../functions/insertImageByURL"
import {ADD_ELEMENT, ADD_TO_BACKGROUND} from "../store/actionTypes"
import {useEventListener} from "../customHooks/useEventListner"
import {connect} from "react-redux"
import {Editor} from "../entities/Editor"


const mapStateToProps = (state: Editor) => {
    return {
        state: state,
    }
}


const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        insertBackgroundImageByURL: (userUrl: string) => insertImageByURL(userUrl, ADD_TO_BACKGROUND, dispatch),
        insertElementImageByURL: (userUrl: string) => insertImageByURL(userUrl, ADD_ELEMENT, dispatch),
    }
}


function FormDialog(props: any) {
    const [open, setOpen] = React.useState(false)
    const [userUrl, setUserUrl] = React.useState('')

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    let isBackground = props.isBackground

    const handleKeydown = (e: KeyboardEvent) => {
        if (e.keyCode === 13 && open) {
            if (isBackground) {
                props.insertBackgroundImageByURL(userUrl)
            } else {
                props.insertElementImageByURL(userUrl)
            }
            handleClose()
        }
    }

    useEventListener('keydown', handleKeydown)

    return (
        <>
            <div onClick={handleClickOpen}>
                <label className="btn-sm button__onclick dropbox_image__item
                                    dropbox_image__item_no_bottom_margin">
                    <SearchRoundedIcon/> Insert by URL
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
                        onChange={(e) => (setUserUrl(e.target.value))}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={
                        () => {
                            if (isBackground) {
                                props.insertBackgroundImageByURL(userUrl)
                                handleClose()
                            } else {
                                props.insertElementImageByURL(userUrl)
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

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog)