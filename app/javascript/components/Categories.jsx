import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from './actions/CategoriesActions'
import { loadingMessage } from './actions/SessionActions'
import { errorMessage } from './actions/SessionActions'

const Categories = () => {

    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories.allCategories)
    const loading    = useSelector(state => state.categories.loading)
    const hasErrors  = useSelector(state => state.categories.hasErrors)

    let showCategories, showErrors, showLoading

    useEffect( () => {
        dispatch(fetchCategories())
    }, [])

    const noCategories = (
        <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
            <h4>
                No Categories yet.  Why not create one?
            </h4>
        </div>
    )

    if (categories.length > 0) {
        showCategories = (
            categories.map((category, index) => (
                <div key={index} className="col-md-6 col-lg-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">
                                <Link to={'/categories/' + category.id}>{category.name}</Link>
                            </h5>
                        </div>
                    </div>
                </div>
            ))
        )
    } else {
        showCategories = (
            <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
                <h4>
                    No Categories yet.  Why not create one?
                </h4>
            </div>
        )
    }

    if (loading) {
        showLoading = (
            <>
                { loadingMessage }
            </>
        )
    }

    if (hasErrors) {
        showErrors = (
            <>
                { errorMessage }
            </>            
        )
    }

    return(
        <>
            { showLoading }
            { showErrors }
            { showCategories }
        </>
    )

}

export default Categories