import {ImageElement} from "../entities/Elements"
import {heIL} from "@material-ui/core/locale";

export function imageInitAfterOnload(img: HTMLImageElement, copyImage: ImageElement): ImageElement {
    let imgWidth: number
    let imgHeight: number
    copyImage.viewBox.width = img.width
    copyImage.viewBox.height = img.height
    if (img.width > img.height) {
        if (img.width >= 1000) {
            if (img.height / 9 * 16 >= img.width) {
                imgHeight = 100
                imgWidth = Math.round(img.width / (img.height / 9 * 16) * 100 * 100) / 100
            } else {
                imgWidth = 100
                imgHeight = Math.round(img.height / 9 * 16 / img.width * 100 * 100) / 100
            }
        } else {
            if (Math.round(img.height / 9 * 16 / img.width * 100) / 100 >= 1) {
                imgWidth = img.width / 10
                imgHeight = Math.round(img.height / 9 * 16 / 10 * 100) / 100
            } else {
                imgWidth = img.width / 10
                imgHeight = img.height / 10
            }
        }
    } else {
        imgWidth = Math.round(img.width / (img.height / 9 * 16) * 100 * 100) / 100
        if (img.height / 9 * 16 >= 1000) {
            imgHeight = 100
        } else {
            imgHeight = Math.round(img.height / 9 * 16 / 10 * 100) / 100
        }
    }

    copyImage.bottomRightPoint.x = imgWidth
    copyImage.bottomRightPoint.y = imgHeight

    return copyImage
}