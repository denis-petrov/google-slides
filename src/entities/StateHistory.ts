import {Editor} from "./Editor"

export type StateHistory = {
    history: Array<Editor>,
    index: number
}