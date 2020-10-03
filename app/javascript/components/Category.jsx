import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { fetchCategory, deleteCategory } from './actions/CategoriesActions'
import { getToken, loadingMessage, errorMessage } from './actions/SessionActions'

const Category = (props) => {

    const dispatch = useDispatch()
    const token = getToken()
    const category_id = props.category_id

    const category  = useSelector(state => state.categories.selectedCategory.name)
    const posts     = useSelector(state => state.categories.selectedCategory.posts)
    const loading   = useSelector(state => state.categories.loading)
    const hasErrors = useSelector(state => state.categories.hasErrors)

    useEffect(() => {
        dispatch(fetchCategory(props.category_id))
    }, [])

    let showCategory, showLoading, showError

    let deleteCategoryButton = ( 
        <>
            <Button className="btn btn-primary" onClick={(token, category_id) => deleteCategory(token, category_id)}>Delete category</Button>
        </>
    )

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
            {deleteCategoryButton}
            {showCategory}
        </>
    )
}

export default Category