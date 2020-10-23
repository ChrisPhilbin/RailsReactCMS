// import React, {useState, useEffect} from 'react'
// import getCategories from '../actions/CategoriesActions'

// const EditPost = (props) => {

//     const post_id = props.id

//     const [postTitle, setPostTitle] = useState("")
//     const [postBody, setPostBody] = useState("")
//     const [postCategory, setPostCategory] = useState("") //variable for original value of the post
//     const [postCategories, setPostCategories] = useState([]) //variable containing all categories to potentially reassign post to

//     useEffect (() => { 
//         const url = '/api/v1/show/' + post_id
//         fetch(url)
//             .then(response => {
//                 if (response.ok) {
//                     return response.json()
//                 }
//                 throw new Error("Network response not ok")
//             })
//             .then(response => (setPostTitle(response.post.title), setPostBody(response.post.body), setPostCategory(response.posted_in)))
//     }, [])

//     useEffect(() => {
//         const url = '/api/v1/categories'
//         fetch(url)
//             .then(response => {
//                 if (response.ok) {
//                     return response.json()
//                 }
//                 throw new Error("Network response not ok")
//             })
//             .then(response => setPostCategories(response))
//     }, [])

//     console.log(postCategories, "post categories")
//     console.log(postCategory, "posted in this category")

//     const onFormSubmit = (event) => {
//         event.preventDefault()
//         const url = "/api/v1/edit/" + post_id

//         if (postTitle.length == 0 || postBody.length == 0)
//             return

//         const requestBody = {
//             title: postTitle,
//             body: postBody,
//             category_id: postCategory,
//             user_id: props.user_id
//         }

//         const token = document.querySelector('meta[name="csrf-token"]').content

//         fetch(url, {
//             method: "POST",
//             headers: {
//                 "X-CSRF-Token": token,
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             },
//             body: JSON.stringify(requestBody)
//         })
//             .then(response => {
//                 if (response.ok) {
//                     return response.json()
//                 }
//                 throw new Error("Network response not ok")
//             })
//             .then(props.history.push('/post/'+post_id))
//             .catch(error => console.log(error.message))
//     }

//     const displaySelect = (
//         postCategories.map((category) => (
//             <option value={category.id} key={category.id}>{category.name}</option>
//         ))
//     )

//     return(

//         <div key={props.id}>
//         <form onSubmit={onFormSubmit}>
//             <div className="form-group">
//                 <label htmlFor="postCategory">Category</label>
//                 <select defaultValue={postCategory} name="postCategory" onChange={(e) => setPostCategory(e.target.value)}>
//                     {displaySelect}
//                 </select>
//             </div>
//             <div className="form-group">
//                 <label htmlFor="postTitle">Post Title</label>
//                 <input type="text" className="form-control" name="postTitle" defaultValue={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
//             </div>
//                 <label htmlFor="postBody">Post Body</label>
//                 <textarea name="postBody" className="form-control" defaultValue={postBody} onChange={(e) => setPostBody(e.target.value)}></textarea>
//              <div className="form-group">
//            </div>
//             <button type="submit" className="btn btn-primary" onClick={onFormSubmit}>Submit</button>
//         </form>
//     </div>

//     )

// }

// export default EditPost

import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from './actions/CategoriesActions'
import { getSinglePost } from './actions/PostsActions'
import { getToken } from './actions/SessionActions'

const EditPost = (props) => {

    const dispatch = useDispatch()
    const post_id = props.id
    const token = getToken()

    const [postCategory, setPostCategory] = useState(useSelector(state => state.posts.selectedPost.posted_in))
    const [postTitle, setPostTitle]       = useState(useSelector(state => state.posts.selectedPost.title))
    const [postBody, setPostBody]         = useState(useSelector(state => state.posts.selectedPost.body))

    // const post       = useSelector(state => state.posts.selectedPost)
    const categories = useSelector(state => state.categories.allCategories)

    useEffect(() => {
        getSinglePost(post_id)
        getCategories()
    },[])

    const onFormSubmit = () => {

    }

    const displaySelect = (
        categories.map((category) => (
            <option value={category.id} key={category.id}>{category.name}</option>
        ))
    )

    return(

        <div key={props.id}>
            <form onSubmit={onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="postCategory">Category</label>
                    <select defaultValue={post.posted_in} name="postCategory" onChange={(e) => setPostCategory(e.target.value)}>
                        {displaySelect}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="postTitle">Post Title</label>
                    <input type="text" className="form-control" name="postTitle" defaultValue={post.title} onChange={(e) => setPostTitle(e.target.value)} />
                </div>
                    <label htmlFor="postBody">Post Body</label>
                    <textarea name="postBody" className="form-control" defaultValue={post.body} onChange={(e) => setPostBody(e.target.value)}></textarea>
                <div className="form-group">
            </div>
                <button type="submit" className="btn btn-primary" onClick={onFormSubmit}>Submit</button>
            </form>
        </div>

    )
}

export default EditPost