import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCategories } from './actions/CategoriesActions'
import { createPost } from './actions/PostsActions'
import { getToken } from './actions/SessionActions'


const NewPost = (props) => {

    const dispatch = useDispatch()
    const token = getToken()
    const user = props.user_id

    const categories = useSelector(state => state.categories.allCategories)

    const [selectedCategory, setSelectedCategory] = useState(props.post ? selectedCategory = props.post.posted_in : '')
    const [postBody, setPostBody] = useState(props.post ? postBody = props.post.postBody : '')
    const [postTitle, setPostTitle] = useState(props.post ? postTitle = props.post.postTitle : '')

    const requestBody = {
        title: postTitle,
        body: postBody,
        user_id: user,
        category_id: selectedCategory
    }
    
    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    const onFormSubmit = (event) => {
        event.preventDefault()
        createPost(token, requestBody)
    }

    return(
        <>
         <div>
             <form onSubmit={onFormSubmit}>
                 <div className="form-group">
                     <label htmlFor="postCategory">Category</label>
                     <select className="form-control" onChange={(e) => setSelectedCategory(e.target.value)}>
                         {categories.map(category => <option value={category.id} key={category.id}>{category.name}</option>)}
                     </select>
                 </div>
                 <div className="form-group">
                     <label htmlFor="postTitle">Post Title</label>
                     <input type="text" className="form-control" name="postTitle" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
                 </div>
                 <div className="form-group">
                     <label htmlFor="postBody">Post Body</label>
                     <textarea name="postBody" className="form-control" value={postBody} onChange={(e) => setPostBody(e.target.value)}></textarea>
                 </div>
                 <button type="submit" className="btn btn-primary">Submit</button>
             </form>
         </div>
        </>
    )
}

export default NewPost