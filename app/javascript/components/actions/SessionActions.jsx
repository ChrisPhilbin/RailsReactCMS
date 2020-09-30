import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

export const getToken = () => {
    document.querySelector('meta[name="csrf-token"]').content
}

export const isLoggedIn = (user_id) => {
    return (user_id != "not_signed_in" ? true : false)
}

export const newPostButton = (
    <>
        <Link to={'/posts/new'} className="btn btn-primary" role="button">New post</Link>
    </>
)

export const signInButton = (
    <div>
        <a href="/user/sign_in"><Button className="btn btn-primary">Sign in</Button></a>
    </div>
)

export const loadingMessage = (
    <div>
        <h3>Loading... Please wait a moment...</h3>
    </div>
)

export const errorMessage = (
    <div>
        <h3>Something went wrong... Please try again...</h3>
    </div>
)

export const adminButtons = (post_id, token) => {

    const deletePost = () => {
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

    return(
        <>
            <Link to={'/posts/'+post_id+'/edit'} className="btn btn-primary" role="button">Edit post</Link> <Link to={'/posts/new'} className="btn btn-primary" role="button">New post</Link> <Button className="btn btn-primary" onClick={deletePost}>Remove post</Button>
        </>
    )
}