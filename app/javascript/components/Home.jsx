// import React, {useState, useEffect} from 'react'
// import { Link } from 'react-router-dom'

//   const App = () => {

//     const [latestPosts, setLatestPosts] = useState([])

//     useEffect(() => {
//       fetch('/api/v1/posts/latest')
//       .then(response => {
//         if (response.ok) {
//           return response.json()
//         }
//         throw new Error("Network response not ok")
//       })
//       .then(response => setLatestPosts(latestPosts.concat(response)))
//     }, [])

//     const allPosts = latestPosts.map((post, index) => (
//       <div key={index} className="col-md-6 col-lg-4">
//           <div className="card mb-4">
//               <div className="card-body">
//                   <h5 className="card-title">
//                       <Link to={'/posts/' + post.id}>{post.title}</Link>
//                   </h5>
//               </div>
//           </div>
//       </div>
//   ))
//   const noPosts = (
//       <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
//           <h4>
//               No posts yet.  Why not create one?
//           </h4>
//       </div>
//   )

//     return(
//       <div>
//         <div className="py-5">
//             <div className="row">
//                 {latestPosts.length > 0 ? allPosts : noPosts}
//             </div>
//         </div>
//       </div>
//     )

//   }

// export default App

import React, { useState, useEffect } from 'react'
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

  let showPosts

  if (loading) {
    showPosts = (
      <div><h1>Loading posts...</h1></div>
    )
  } else {
    showPosts = (
      <div>Showing the most recent posts</div>
    )
  }
}

export default App