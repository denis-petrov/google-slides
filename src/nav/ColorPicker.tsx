import React from 'react'
import ColorPicker from "react-pick-color"
import FormatColorFillRoundedIcon from "@material-ui/icons/FormatColorFillRounded"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import {addSomeToBackground} from "../functions/addSomeToBackground"
import {hexToRgb} from "../functions/hexToRgb"
import {Color} from "../entities/Color"


export default function ColorPickerOur(props: any) {
    const dispatch = props.dispatch

    const [color, setColor] = React.useState("#fff")
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <div onClick={handleClickOpen}>
                <label className="btn-sm button__onclick dropbox_image__item
                                    dropbox_color_picker__button">
                    <FormatColorFillRoundedIcon/> Select color
                </label>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Select background color</DialogTitle>
                <DialogContent>
                    <ColorPicker color={color} onChange={(color) => {
                        setColor(color.hex)
                    }} hideAlpha={true}
                                 hideInputs={true}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={
                        () => {
                            addSomeToBackground(hexToRgb(color) as Color, dispatch)
                            handleClose()
                        }
                    } style={{color: color}}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}