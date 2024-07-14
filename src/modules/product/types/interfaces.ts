
export interface IProductImage{
		path: string,
		name: string,
}
export interface IProduct {
	slug?:string,
	name: string,
	quantity: number,
	description: string
	bannerImage?: string | IProductImage
	cardImage?: string | IProductImage
	published?: boolean,
	category?:string
}