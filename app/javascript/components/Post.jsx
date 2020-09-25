// import React, {useEffect, useState} from 'react'
// import {Link} from 'react-router-dom'
// import Button from 'react-bootstrap/Button'

// const Post = (props) => {

//     const [post, setPost] = useState({postDetails: {}, postedBy: '', postedIn: '', loaded: false})

//     useEffect (() => { 
//         const url = '/api/v1/show/' + props.id
//         fetch(url)
//             .then(response => {
//                 if (response.ok) {
//                     return response.json()
//                 }
//                 throw new Error("Network response not ok")
//             })
//             .then(response => setPost({postDetails: response.post, postedBy: response.posted_by, postedIn: response.posted_in, loaded: true}))
//     }, [])

//     const editButtons = (
//         <div>
//             <Link to={'/posts/'+props.id+'/edit'} className="btn btn-primary" role="button">Edit post</Link> <Button className="btn btn-primary" onClick={deletePost}>Remove post</Button>
//         </div>
//     )

//     const signInButton = (
//         <div>
//             <a href="/uses/sign_in"><Button className="btn btn-primary">Sign in</Button></a>
//         </div>
//     )
    
//     const showLoading = (
//         <div>
//             <h1>Loading... Please Wait...</h1>
//         </div>
//     )
//     const token = document.querySelector('meta[name="csrf-token"]').content

//     const deletePost = () => {
//         if (confirm('Are you sure you want to delete this post?')) {
//             let deleted = {
//                 method: "DELETE",
//                 headers: {
//                     'Content-type': 'application/json',
//                     'X-CSRF-Token': token
//                 }
//             }
//             fetch('/api/v1/destroy/'+props.id, deleted)
//             .then(alert("Post deleted"))
//         }
//     }

//     if (post.loaded == false) {
//         return(
//             <>
//             {console.log(post.postedBy, "SHOWING WHATS INSIDE POST VAR")}
//                 <div>
//                     {showLoading}
//                 </div>
//             </>
//         )
//     }

//     if (post.loaded == true) {
//         return(
//             <>
//                 <div>
//                     {props.user_id != "not_signed_in" ? editButtons : signInButton}
//                     <div key={post.postDetails.id}>
//                         <strong>{post.postDetails.title}</strong><br />
//                         <i>posted by {post.postedBy} in {post.postedIn}</i>
//                         <p>{post.postDetails.body}</p>
//                     </div>
//                 </div>
//             </>
//         )
//     }

// }

// export default Post

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSinglePost } from './actions/PostsActions'
import {getToken} from './actions/SessionActions'

const Post = (props) => {

    const dispatch = useDispatch()
    const token = getToken()

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
            {showPost}
        </>
    )
}

export default Post