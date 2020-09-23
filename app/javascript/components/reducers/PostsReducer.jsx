import * as actions from '../actions/PostsActions'

export const initialState = {
    selectedPost: {},
    allPosts:     [],
    postLoading: false,
    hasErrors:   false
}

export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_SINGLE_POST:
            return { ...state, loading: true}
        case actions.GET_SINGLE_POST_SUCCESS:
            return { ...state, loading: false, hasErrors: false, selectedPost: action.payload}
        case actions.GET_SINGLE_POST_FAILURE:
            return { ...state, loading: false, hasErrors: true}
        case actions.GET_POSTS:
            return { ...state, loading: true}
        case actions.GET_POSTS_SUCCESS:
            return { ...state, loading: false, hasErrors: false, allPosts: allPosts.concat(action.payload)}
        case actions.GET_POSTS_FAILURE:
            return { ...state, hasErrors: true}
        default:
            return state
    }
}