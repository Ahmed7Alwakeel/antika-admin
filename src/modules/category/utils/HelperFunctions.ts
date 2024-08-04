import { toast } from "react-toastify"
import { FILES_URL } from "../../../config/APIs"
import { ICategoryImage } from "../types/interfaces"
import { generalCreate, generalDelete, generalUpdate } from "../../../API/api"
import { IProduct } from "../../product/types/interfaces"

export const getImageUrl = (
	image: string | ICategoryImage | undefined
): string => {
	if (typeof image === "string") {
		return image
	}
	if (image && "path" in image && "name" in image) {
		return `${FILES_URL}/${image.path}${image.name}`
	}
	return ""
}

export const handleApiError = (error: any, handleLogout: any, setLoading: any) => {
	if (error.response.status === 401) {
		toast.error(
			error.response.data.message || "Unauthorized access. Please log in again."
		)
		handleLogout()
	} else {
		toast.error(
			error.response.data.message || "Something went wrong. Please try again."
		)
	}
	setLoading(false)
}

export const updateProducts = async (categoryId: string, products: IProduct[]) => {
	try {
		const updatedProducts = products.filter((item) => item.id)
		const newProducts = products.filter((item) => !item.id)

		if (updatedProducts.length > 0) {
			await generalUpdate({
				route: `/category/${categoryId}/products`,
				values: updatedProducts,
			})
		}

		if (newProducts.length > 0) {
			await generalCreate({
				route: `/category/${categoryId}/products`,
				values: newProducts,
			})
		}
	} catch (error) {
		throw error
	}
}

export const createCategoryAndProducts = async (
	formData: FormData,
	route: string,
	values: any
) => {
	try {
		const res = await generalCreate({
			route,
			values: formData,
		})

		const categoryId = res.data.data.data._id

		await generalCreate({
			route: `/category/${categoryId}/products`,
			values: values.products,
		})
	} catch (error) {
		throw error
	}
}

export const handleDeleteProducts = async (deletedProducts: string[]) => {
    try {
        const deleted = deletedProducts.filter(item => item != "")
        deleted.length > 0 && await generalDelete(`/product?ids=${deleted.join(',')}`)
    } catch (error) {
        throw error
    }
}
