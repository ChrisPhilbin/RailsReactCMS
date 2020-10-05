import * as actions from '../actions/CategoriesActions'

export const initialState = {
    selectedCategory: "",
    allCategories: [],
    loading: false,
    hasErrors: false
}

export default function categoriesReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_CATEGORY:
            return { ...state, loading: true}
        case actions.GET_CATEGORY_SUCCESS:
            return { ...state, loading: false, hasErrors: false, selectedCategory: action.payload}
        case actions.GET_CATEGORIES:
            return { ...state, loading: true}
        case actions.GET_CATEGORIES_SUCCESS:
            return { ...state, loading: false, hasErrors: false, allCategories: state.allCategories.concat(action.payload)}
        case actions.GET_CATEGORIES_FAILURE:
            return { ...state, loading: false, hasErrors: true}
        default:
            return state
    }
}