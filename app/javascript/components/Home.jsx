// import React from "react";
// import { Link } from "react-router-dom";

// export default () => (
//   <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
//     <div className="jumbotron jumbotron-fluid bg-transparent">
//       <div className="container secondary-color">
//         <h1 className="display-4">Food Recipes</h1>
//         <p className="lead">
//           A curated list of recipes for the best homemade meal and delicacies.
//         </p>
//         <hr className="my-4" />
//         <Link
//           to="/posts"
//           className="btn btn-lg custom-button"
//           role="button"
//         >
//           View Recipes
//         </Link>
//       </div>
//     </div>
//   </div>
// );

import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

  const App = () => {

    const [latestPosts, setLatestPosts] = useState([])

    useEffect(() => {
      fetch('/api/v1/posts/latest')
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("Network response not ok")
      })
      .then(response => setLatestPosts(latestPosts.concat(response)))
    }, [])

    const allPosts = latestPosts.map((post, index) => (
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
      <div>
        <div className="py-5">
            <div className="row">
                {latestPosts.length > 0 ? allPosts : noPosts}
            </div>
        </div>
      </div>
    )

  }

export default App