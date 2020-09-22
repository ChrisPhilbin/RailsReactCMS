import * as actions from '../actions/CategoriesActions'

export const initialState = {
    selectedCategory: "",
    allCategories: [],
    categoriesLoading: false,
    hasErrors: false
}

export default function categoriesReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_CATEGORY:
            return { ...state, loading: true}
        case actions.GET_CATEGORY_SUCCESS:
            return { ...state, loading: false, hasErrors: false, selectedCategory: action.payload}
        default:
            return state
    }
}