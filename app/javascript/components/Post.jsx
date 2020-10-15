import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSinglePost } from './actions/PostsActions'
import {getToken, signInButton} from './actions/SessionActions'
import {isLoggedIn} from './actions/SessionActions'
import {editPostButton} from './actions/SessionActions'
import {newPostButton} from './actions/SessionActions'
import {adminButtons} from './actions/SessionActions'

const Post = (props) => {

    const dispatch = useDispatch()
    const token = getToken()
    const loggedIn = isLoggedIn(props.user_id)
    const signIn = signInButton
    const buttons = adminButtons(props.id, token)

    useEffect(() => {
        dispatch(fetchSinglePost(props.id))
    }, [])

    const post         = useSelector(state => state.posts.selectedPost.post)
    const posted_by    = useSelector(state => state.posts.selectedPost.posted_by)
    const posted_in    = useSelector(state => state.posts.selectedPost.posted_in)
    const loading      = useSelector(state => state.posts.loading)
    const hasErrors    = useSelector(state => state.posts.hasErrors)

    let showPost
    let showLoading
    let showErrors

    if (post) {
        showPost = (
            <div>
                <strong>{post.title}</strong> <i>posted by {posted_by} in {posted_in}</i>
                <br />
                {post.body}
            </div>
        )
    }

    if (loading) {
        showLoading = (
            <div>
                <h3>Loading... Please wait</h3>
            </div>
        )
    }

    if (hasErrors) {
        showErrors = (
            <div>
                <h3>Something went wrong... Please try again</h3>
            </div>
        )
    }
    return(
        <>
            {showLoading}
            {showErrors}
            { loggedIn ? buttons : signIn}
            {showPost}
        </>
    )
}

export default Post