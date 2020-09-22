export const GET_POST = "GET_POST"
export const GET_POST_SUCCESS = "GET_POST_SUCCESS"
export const GET_POST_FAILURE = "GET_POST_FAILURE"
export const GET_POSTS = "GET_POSTS"
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS"
export const GET_POSTS_FAILURE = "GET_POSTS_FAILURE"

//Rename the above exports???


//MULTIPLE POSTS


export const getPost = () => (
    { type: GET_POST }
)

export const getPostSuccess = (post) => (
    { type: GET_POST_SUCCESS, payload: post }
)

export const getPostFailure = () => (
    { type: GET_POST_FAILURE }
)

export const fetchPost = (post_id) => {
    return (dispatch) => {
        dispatch(getPost())
            fetch('/api/v1/post/'+post_id)
            .then(response => response.json())
            .then(data => dispatch(getPostSuccess(data)))
    }
}

//SINGLE POST