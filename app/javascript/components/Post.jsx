import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Post = (props) => {

    console.log(props, "PROPS FROM POST.JSX")

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
    }, [])

    const showPost = (
        <div key={props.id}>
            <strong>{post.title}</strong><br />
            <p>{post.body}</p>
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
            <div>
                {props.user_id != "not_signed_in" ? editButtons : signInButton}
                {showPost}
            </div>
        </>
    )

}

export default Post