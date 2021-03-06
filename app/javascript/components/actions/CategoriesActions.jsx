export const GET_CATEGORIES          = 'GET_CATEGORIES'
export const GET_CATEGORIES_SUCCESS  = 'GET_CATEGORIES_SUCCESS'
export const GET_CATEGORIES_FAILURE  = 'GET_CATEGORIES_FAILURE'
export const GET_CATEGORY            = 'GET_CATEGORY'
export const GET_CATEGORY_SUCCESS    = 'GET_CATEGORY_SUCCESS'
export const GET_CATEGORY_FAILURE    = 'GET_CATEGORY_FAILURE'
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS'

//MULTIPLE CATEGORIES
export const getCategories = () => ({
    type: GET_CATEGORIES
})

export const getCategoriesSuccess = categories => ({
    type: GET_CATEGORIES_SUCCESS,
    payload: categories
})

export const getCategoriesFailure = () => ({
    type: GET_CATEGORIES_FAILURE
})

export function fetchCategories() {
    return (dispatch) => {
        dispatch(getCategories());
            fetch('/api/v1/categories')
            .then(response => response.json())
            .then(data => dispatch(getCategoriesSuccess(data)))
            .catch(getCategoriesFailure())
    }
}

//SINGLE CATEGORY
export const getCategory = () => ({
    type: GET_CATEGORY
})

export const getCategorySuccess = category => ({
    type: GET_CATEGORY_SUCCESS,
    payload: category
})

export const getCategoryFailure = () => ({
    type: GET_CATEGORY_FAILURE
})

export function fetchCategory(category_id) {
    return (dispatch) => {
        dispatch(getCategory());
            fetch('/api/v1/categories/'+category_id)
            .then(response => response.json())
            .then(data => dispatch(getCategorySuccess(data)))
            .catch(getCategoryFailure())
    }
}

export function deleteCategory(token, category_id) {
    console.log(token, "token from deleteCategory function")
    console.log(category_id, "category_id from deleteCategory function")
    if (confirm("WARNING! Removing this category will also remove all posts associated with it!")) {
        let deleted = {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                'X-CSRF-Token': token
            }
        }
        fetch('/api/v1/categories/'+category_id, deleted)
        .then(alert("Category deleted"))
    }
}