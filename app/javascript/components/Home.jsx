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
    showPosts = ( allPosts.map((post, index) => (
      <div key={index} className="col-md-6 col-lg-4">
          <div className="card mb-4">
              <div className="card-body">
                  <h5 className="card-title">
                      <Link to={'/posts/' + post.id}>{post.title}</Link>
                  </h5>
              </div>
          </div>
      </div>
    )))
  }

  return(
    <div className="py-5">
      <div className="row">
        {status}
        {showPosts}
      </div>
    </div>
  )
}

export default App