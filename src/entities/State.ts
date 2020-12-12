import {Editor} from "./Editor"

export type {
    State
}

type State = {
    past: Array<Editor>,
    present: Editor,
    future: Array<Editor>
}
