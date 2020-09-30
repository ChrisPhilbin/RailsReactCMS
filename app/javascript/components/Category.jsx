// import React, {useState, useEffect} from 'react'
// import { Link } from 'react-router-dom'
// import Button from 'react-bootstrap/Button'

// const Category = (props) => {


//     const [category, setCategory] = useState("")
//     const [posts, setPosts]       = useState([])

//     useEffect(() => {
//         const url = '/api/v1/categories/' + props.category_id
//         fetch(url)
//             .then(response => {
//                 if (response.ok) {
//                     return response.json()
//                 }
//                 throw new Error("Network response not ok")
//             })
//             .then(response => (setPosts(posts.concat(response.posts)), setCategory(response.name)))
//     }, [])

//     const token = document.querySelector('meta[name="csrf-token"]').content

//     const deleteCategory = () => {
//         if (confirm("WARNING! Removing this category will also remove all posts associated with it!")) {
//             let deleted = {
//                 method: "DELETE",
//                 headers: {
//                     'Content-type': 'application/json',
//                     'X-CSRF-Token': token
//                 }
//             }
//             fetch('/api/v1/categories/'+props.category_id, deleted)
//             .then(alert("Category deleted"))
//         }
//     }

//     const allPosts = posts.map((post, index) => (
//         <div key={index} className="col-md-6 col-lg-4">
//             <div className="card mb-4">
//                 <div className="card-body">
//                     <h5 className="card-title">
//                         <Link to={'/posts/' + post.id}>{post.title}</Link>
//                     </h5>
//                 </div>
//             </div>
//         </div>
//     ))

//     const noPosts = (
//         <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
//             <h4>
//                 No posts yet.  Why not create one?
//             </h4>
//         </div>
//     )

//     const deleteCategoryButton = (
//         <Button className="btn btn-primary" onClick={deleteCategory}>Delete category</Button>
//     )

//     return(
//         <>
//             <h3>{category} - Showing all posts</h3>
//             {deleteCategoryButton}
//             <div className="py-5">
//                     <div className="row">
//                         {posts.length > 0 ? allPosts : noPosts}
//                     </div>
//             </div>
//         </>
//     )

// }

// export default Category

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { fetchCategory } from './actions/CategoriesActions'
import { getToken, loadingMessage, errorMessage } from './actions/SessionActions'

const Category = (props) => {

    const dispatch = useDispatch()
    const token = getToken()

    const category  = useSelector(state => state.categories.selectedCategory.name)
    const posts     = useSelector(state => state.categories.selectedCategory.posts)
    const loading   = useSelector(state => state.categories.loading)
    const hasErrors = useSelector(state => state.categories.hasErrors)

    useEffect(() => {
        dispatch(fetchCategory(props.category_id))
    }, [])

    let showCategory, showLoading, showError

    if (!category) {
        return null
    } else {
        showCategory = (
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
        showLoading = (
            <>
                {loadingMessage}
            </>
        )
    }

    if (hasErrors) {
        showError = (
            <>
                {errorMessage}
            </>
        )
    }

    return(
        <>
            {showLoading}
            {showError}
            {showCategory}
        </>
    )
}

export default Category