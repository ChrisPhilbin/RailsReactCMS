import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCategories } from '../actions/CategoriesActions'

const SideBar = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    const categories = useSelector(state => state.categories.allCategories)
    const loading    = useSelector(state => state.categories.loading)
    const hasErrors  = useSelector(state => state.categories.hasErrors)

    let showCategories

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
        <div className="categories-column">
            {showCategories}
        </div>
    )
}

export default SideBar