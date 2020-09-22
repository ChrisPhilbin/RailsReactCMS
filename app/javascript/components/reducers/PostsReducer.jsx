import * as actions from '../actions/PostsActions'

export const initialState = {
    selectedPost: {},
    allPosts:     [],
    postLoading: false,
    hasErrors:   false
}

export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_POST:
            return { ...state, loading: true}
        case actions.GET_POST_SUCCESS:
            return { ...state, loading: false, hasErrors: false, selectedPost: action.payload}
        default:
            return state
    }
}