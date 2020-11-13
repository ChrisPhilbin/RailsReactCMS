import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCategories } from '../../actions/CategoriesActions'
import { Loading } from 'images/loading.gif'

const CategoriesWidget = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    const categories = useSelector(state => state.categories.allCategories)
    const loading    = useSelector(state => state.categories.loading)
    const hasErrors  = useSelector(state => state.categories.hasErrors)

    let showCategories, showLoading

    if (loading) {
        showLoading = (
            <img src={Loading} />
        )
    }

    if (categories.length > 0) {
        showCategories = (
            categories.map((category, index) => (
                <div key={index}>
                    <Link to={'/categories/' + category.id}>{category.name}</Link>
                </div>
            ))
        )
    }

    return(
        <div className="categories-widget">
            <h4>Catgories</h4>
            {showLoading}
            {showCategories}
        </div>
    )

}

export default CategoriesWidget