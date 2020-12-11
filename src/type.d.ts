import {Editor} from "./entities/Editor"

type EditorAction = {
    type: string
    editor: Editor,
    payload: any
}

type DispatchType = (args: EditorAction) => EditorAction