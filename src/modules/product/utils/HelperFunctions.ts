import { FILES_URL } from "../../../config/APIs";
import { IProductImage } from "../types/interfaces";

export const getImageUrl = (image: string | IProductImage | undefined): string => {
    if (typeof image === 'string') {
        return image;
    }
    if (image && 'path' in image && 'name' in image) {
        return `${FILES_URL}/${image.path}${image.name}`;
    }
    return "";
};