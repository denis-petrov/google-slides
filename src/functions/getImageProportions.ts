import {PAGE_HEIGHT, PAGE_WIDTH} from "../entities/Constants";
import {ImageElement} from "../entities/Elements";

export function getImageProportions(img: ImageElement, imgWidth: number, imgHeight: number) {
    let width = img.bottomRightPoint.x - img.topLeftPoint.x;
    let height = img.bottomRightPoint.y - img.topLeftPoint.y;
    if (width > height) {
        if (width >= 100) {
            imgWidth = PAGE_WIDTH;
            imgHeight = Math.abs(height/(width/16*9)*100) / 100 * PAGE_HEIGHT;
        }
    } else {
        if (height >= 100) {
            imgWidth = Math.abs(height/(height/9*16)*100/16*9) / 100 * PAGE_WIDTH;
            imgHeight = PAGE_HEIGHT;
            if (width/9*16/height > 1) {
                imgWidth = Math.abs(height/(height/9*16)*100) / 100 * PAGE_WIDTH;
            }
        }
    }

    return {imgWidth, imgHeight}
}