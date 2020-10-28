import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchLatestPosts } from './actions/PostsActions'

const App = () => {

  const dispatch = useDispatch()

  const allPosts  = useSelector(state => state.posts.allPosts)
  const loading   = useSelector(state => state.posts.loading)
  const hasErrors = useSelector(state => state.posts.hasErrors) 

  useEffect(() => {
    dispatch(fetchLatestPosts())
  }, [])

  let status
  let showPosts

  if (loading) {
    status = (
      <div><h1>Loading posts...</h1></div>
    )
  }

  if (allPosts.length > 0) {
    console.log(allPosts)
    showPosts = ( allPosts.map((post, index) => (
      <div key={index}>
        <h3 className="mt-4">
            <Link to={'/posts/' + post.id}>{post.title}</Link>
        </h3>
        <p>{post.body}</p>
      </div>
    )))
  }

  return(
    <div className="posts-row">
      {status}
      {showPosts}
    </div>
  )
}

export default App