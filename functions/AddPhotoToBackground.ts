import {Redactor} from "./entities/Redactor";
import {Slide} from "./entities/Slide";
import {Image} from "./entities/Image";

export {
    AddPhotoToBackground
}

function AddPhotoToBackground(Redactor: Redactor, Slide: Slide, Photo: Image) {
    return Redactor;
}   