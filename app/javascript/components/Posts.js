import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

const Posts = (props) => {

    const [posts, setPosts] = useState([])

    let user_id = props.user_id

    useEffect(() => {
        const url = '/api/v1/posts/index'
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Network response not ok")
            })
            .then(response => setPosts(posts.concat(response)))
            .catch(() => this.props.history.push('/'))
    }, [])

    const allPosts = posts.map((post, index) => (
        <div key={index} className="col-md-6 col-lg-4">
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">
                        <Link to={'/posts/' + post.id}>{post.title}</Link>
                    </h5>
                </div>
            </div>
        </div>
    ))
    const noPosts = (
        <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
            <h4>
                No posts yet.  Why not create one?
            </h4>
        </div>
    )

    const newPostButton = (
        <Link to={'/posts/new'} className="btn btn-primary" role="button">New post</Link>
    )

    const signInButton = (
        <a href="/users/sign_in"><button className="btn btn-primary">Sign in</button></a>
    )

    return(
            <>
                {user_id != "not_signed_in" ? newPostButton : signInButton}

                <div className="py-5">
                    <div className="row">
                        {posts.length > 0 ? allPosts : noPosts}
                    </div>
                </div>
            </>
    )
}

export default Posts