import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {fetchAllPosts} from './actions/PostsActions'

const Posts = () => {

    const dispatch = useDispatch()

    let posts     = useSelector(state => state.posts.allPosts)
    let loading   = useSelector(state => state.posts.loading)
    let hasErrors = useSelector(state => state.posts.hasErrors)

    useEffect(() => {
        dispatch(fetchAllPosts())
    }, [])

    let showPosts
    
    if (!posts) {
        return null
    } else {
        showPosts = (
            posts.map((post, index) => (
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
        )
    }

    if (loading) {
        showPosts = (
            <div>
                <h3>Loading... Please wait...</h3>
            </div>
        )
    }

    if (hasErrors) {
        showPosts = (
            <div>
                <h3>Sorry, something went wrong. Please try again</h3>
            </div>
        )
    }

    return (
        <>
            {showPosts}
        </>
    )

}

export default Posts