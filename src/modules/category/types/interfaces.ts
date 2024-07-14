
export interface ICategoryImage{
		path: string,
		name: string,
}
export interface ICategory {
	slug?:string,
	name: string
	description: string
	bannerImage?: string | ICategoryImage
	cardImage?: string | ICategoryImage
	published?: boolean
}