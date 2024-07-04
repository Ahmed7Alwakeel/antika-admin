import { createSlice } from "@reduxjs/toolkit"

interface IBreadCrumbs {
	links: {
		label: string
		path: string
	}[]
	page_title: string
}
interface BreadCrumbsState {
	breadCrumbsData: IBreadCrumbs
}
const initialState: BreadCrumbsState = {
	breadCrumbsData: {
		links: [{ label: "home", path: "/" }],
		page_title: "Home",
	},
}

const breadCrumbsSlice = createSlice({
	name: "breadCrumbsData",
	initialState,
	reducers: {
		setBreadCrumbsData: (state, action) => {
			state.breadCrumbsData = action.payload
		},
	},
})

export const setBreadCrumbsData = breadCrumbsSlice.actions.setBreadCrumbsData
export default breadCrumbsSlice.reducer
