import React from 'react'
import ColorPicker from "react-pick-color"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import {addSomeToBackground} from "../functions/addSomeToBackground"
import {hexToRgb} from "../functions/hexToRgb"
import {Color} from "../entities/Color"
import {store} from "../store/store"


export default function ColorPickerOur(props: any) {
    const dispatch = props.dispatch
    let editor = store.getState()
    let slideColor: string = '#fff'
    editor.presentation.slides.forEach((s) => {
        if (editor.selectionSlidesId.includes(s.id) && typeof (s.background) !== "string") {
            slideColor = `rgb(${s.background.red}, ${s.background.green}, ${s.background.blue})`
        }
    })

    const [color, setColor] = React.useState(slideColor)
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
                    <svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24"
                         aria-hidden="true">
                        <path
                            d="M16.56 8.94L7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10L10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z"/>
                        <path fill={color} d="M0 20h24v4H0z"/>
                    </svg>
                    Select color
                </label>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" color="primary">Select background color</DialogTitle>
                <DialogContent style={{border: 'none'}}>
                    <ColorPicker color={color} onChange={(color) => {
                        setColor(color.hex)
                    }} hideAlpha={true} hideInputs={false}
                                 theme={{
                                     "background": "#fff",
                                     "inputBackground": "#f4f4f4",
                                     "color": "#262626",
                                     "borderColor": "#ffffff",
                                     "borderRadius": "5px",
                                     "boxShadow": "none",
                                     "width": "280px"
                                 }}/>
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
                    } color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}