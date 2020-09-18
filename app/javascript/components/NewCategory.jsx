import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'

const NewCategory = (props) => {

    const [categoryName, setCategoryName] = useState("")

    const onFormSubmit = (e) => {
        e.preventDefault()

        const url = '/api/v1/categories/create'

        if (categoryName.length == 0) {
            return
        }

        const requestBody = {
            name: categoryName
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
            .then(props.history.push('/categories/'))
            .catch(error => console.log(error.message))
    }


    return(

        <div>
            <form onSubmit={onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="categoryName">Category Name</label>
                    <input type="text" className="form-control" name="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={onFormSubmit}>Submit</button>
            </form>
        </div>

    )

}

export default withRouter(NewCategory)