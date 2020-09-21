import {combineReducers} from 'redux'

import postsReducer from './PostsReducer'
import categoriesReducer from './CategoriesReducer'

const rootReducer = combineReducers({
    posts:      postsReducer,
    categories: categoriesReducer
})

export default rootReducer