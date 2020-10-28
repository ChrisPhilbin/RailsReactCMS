import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../actions/CategoriesActions'

const SideBar = () => {

    useEffect(() => {
        fetchCategories()
    }, [])

    const categories = useSelector(state => state.categories.allCategories)
    const loading    = useSelector(state => state.categories.loading)
    const hasErrors  = useSelector(state => state.categories.hasErrors)

    return(

    )
}

export default SideBar