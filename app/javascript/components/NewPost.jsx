import React, { useState, useEffect } from 'react'

const NewPost = (props) => {

    const [postTitle, setPostTitle]   = useState("")
    const [postBody, setPostBody]     = useState("")
    const [categories, setCategories] = useState([])

    const getCategories = () => {
        const url = '/api/v1/categories'
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Network response not ok")
            })
            .then(response => setCategories(categories.concat(response)))
    }

    useEffect(() => {
        getCategories()
    }, [])

    const onFormSubmit = (event) => {
        event.preventDefault()
        const url = "/api/v1/posts/create"

        if (postTitle.length == 0 || postBody.length == 0)
            return

        const requestBody = {
            title: postTitle,
            body: postBody,
            user_id: props.user_id,
            category_id: 1
        }

        const token = document.querySelector('meta[name="csrf-token"]').content

        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Network response not ok")
            })
            .then(response => this.props.history.push('/post/'+response.id))
            .catch(error => console.log(error.message))
    }

    return(

        <div>
            <form onSubmit={onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="postCategory">Category</label>
                    <select className="form-control">
                        {categories.map(category => <option value={category.id}>{category.name}</option>)}
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
                <button type="submit" className="btn btn-primary" onClick={onFormSubmit}>Submit</button>
            </form>
        </div>
    )

}

export default NewPost