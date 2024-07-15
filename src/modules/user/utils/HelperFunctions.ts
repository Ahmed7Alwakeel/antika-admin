import { FILES_URL } from "../../../config/APIs";
import { ICategoryImage } from "../types/interfaces";

export const getImageUrl = (image: string | ICategoryImage | undefined): string => {
    if (typeof image === 'string') {
        return image;
    }
    if (image && 'path' in image && 'name' in image) {
        return `${FILES_URL}/${image.path}${image.name}`;
    }
    return "";
};