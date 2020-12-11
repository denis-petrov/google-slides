import {Editor} from '../entities/Editor'
import {deepCopy} from 'deep-copy-ts'

export function setEditor(newEditor: Editor): Editor {
    return deepCopy(newEditor)
}