import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Post = (props) => {

    const [post, setPost] = useState({})

    useEffect (() => { 
        const url = '/api/v1/show/' + props.id
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Network response not ok")
            })
            .then(response => setPost(response))
            .catch(() => this.props.history.push('/posts'))
    }, [post])

    const showPost = (
        <div key={post.post.id}>
            <strong><h1>{post.post.title}</h1></strong><br />
            <i>posted by {post.posted_by} in {post.posted_in}</i>
            <p>{post.post.body}</p>
        </div>
    )

    const editButtons = (
        <div>
            <Link to={'/posts/'+props.id+'/edit'} className="btn btn-primary" role="button">Edit post</Link> <Button className="btn btn-primary" onClick={deletePost}>Remove post</Button>
        </div>
    )

    const signInButton = (
        <div>
            <a href="/uses/sign_in"><Button className="btn btn-primary">Sign in</Button></a>
        </div>
    )

    const token = document.querySelector('meta[name="csrf-token"]').content

    const deletePost = () => {
        if (confirm('Are you sure you want to delete this post?')) {
            let deleted = {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRF-Token': token
                }
            }
            fetch('/api/v1/destroy/'+props.id, deleted)
            .then(alert("Post deleted"))
        }
    }

    return(
        <>
        {console.log(post, "SHOWING WHATS INSIDE POST VAR")}
            <div>
                {props.user_id != "not_signed_in" ? editButtons : signInButton}
                {showPost}
            </div>
        </>
    )

}

export default Post