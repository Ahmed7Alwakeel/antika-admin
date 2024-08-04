import { IProduct } from "../../product/types/interfaces"

export interface ICategoryImage{
		path: string,
		name: string,
}
export interface ICategory {
	id?:string,
	slug?:string,
	name: string
	description: string
	bannerImage?: string | ICategoryImage
	cardImage?: string | ICategoryImage
	published?: boolean
	products:IProduct[]
}