import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const Category = (props) => {


    const [category, setCategory] = useState("")
    const [posts, setPosts]       = useState([])

    useEffect(() => {
        const url = '/api/v1/categories/' + props.category_id
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Network response not ok")
            })
            .then(response => (setPosts(posts.concat(response.posts)), setCategory(response.name)))
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

    return(
        <>
            <h3>{category} - Showing all posts</h3>
            <div className="py-5">
                    <div className="row">
                        {posts.length > 0 ? allPosts : noPosts}
                    </div>
            </div>
        </>
    )

}

export default Category