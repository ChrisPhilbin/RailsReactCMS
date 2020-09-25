export const GET_SINGLE_POST = "GET_SINGLE_POST"
export const GET_SINGLE_POST_SUCCESS = "GET_SINGLE_POST_SUCCESS"
export const GET_SINGLE_POST_FAILURE = "GET_SINGLE_POST_FAILURE"

export const GET_POSTS = "GET_POSTS"
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS"
export const GET_POSTS_FAILURE = "GET_POSTS_FAILURE"

//SINGLE POSTS
export const getSinglePost = () => (
    { type: GET_SINGLE_POST }
)

export const getSinglePostSuccess = (post) => (
    { type: GET_SINGLE_POST_SUCCESS, payload: post }
)

export const getSinglePostFailure = () => (
    { type: GET_SINGLE_POST_FAILURE }
)

export const fetchSinglePost = (post_id) => {
    return (dispatch) => {
        dispatch(getSinglePost())
            fetch('/api/v1/show/'+post_id)
            .then(response => response.json())
            .then(data => dispatch(getSinglePostSuccess(data)))
            .catch(getSinglePostFailure())
    }
}

//MULTIPLE POSTS FROM A SPECIFIC CATEGORY
export const getPosts = () => (
    { type: GET_POSTS }
)

export const getPostsSuccess = (posts) => (
    { type: GET_POSTS_SUCCESS, payload: posts }
)

export const getPostsFailure = () => (
    { type: GET_POSTS_FAILURE }
)

export const fetchPosts = (category_id) => {
    return (dispatch) => {
        dispatch(getPosts())
            fetch('/api/v1/categories/'+category_id)
            .then(response => response.json())
            .then(data => dispatch(getPostSuccess(data.posts)))
            .catch(getPostsFailure())
    }
}

export const fetchLatestPosts = () => {
    return (dispatch) => {
        dispatch(getPosts())
            fetch('api/v1/posts/latest')
            .then(response => response.json())
            .then(data => dispatch(getPostsSuccess(data)))
            .catch(getPostsFailure())
    }
}

//DELETE A POST

export const deletePost = (token, post_id) => {
    if (confirm('Are you sure you want to delete this post?')) {
        let deleted = {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                'X-CSRF-Token': token
            }
        }
        fetch('/api/v1/destroy/'+post_id, deleted)
        .then(alert("Post deleted"))
    }
}