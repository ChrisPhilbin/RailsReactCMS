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

export const fetchAllPosts = () => {
    return (dispatch) => {
        dispatch(getPosts())
            fetch('/api/v1/posts/index')
            .then(response => response.json())
            .then(data => dispatch(getPostsSuccess(data)))
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

//CREATE A POST

export const createPost = (token) => {

    const url = "/api/v1/posts/create"

    if (postTitle.length == 0 || postBody.length == 0)
        return

    const requestBody = {
        title: postTitle,
        body: postBody,
        user_id: user,
        category_id: category
    }

    fetch(url, {
        method: "POST",
        headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (response.ok) {
            return response.json()
        }
        throw new Error("Network response not ok")
    })
    .then(props.props.history.push('/'))
    .catch(error => console.log(error.message))

}