// import React, {useEffect, useState} from 'react'
// import {Link} from 'react-router-dom'

// const Categories = () => {

//     const [categories, setCategories] = useState([])

//     useEffect(() => {
//         const url = '/api/v1/categories'
//         fetch(url)
//             .then(response => {
//                 if (response.ok) {
//                     return response.json()
//                 }
//                 throw new Error("Network response not ok")
//             })
//             .then(response => setCategories(categories.concat(response)))
//     }, [])

//     const allCategories = categories.map((category, index) => (
//         <div key={index} className="col-md-6 col-lg-4">
//             <div className="card mb-4">
//                 <div className="card-body">
//                     <h5 className="card-title">
//                         <Link to={'/categories/' + category.id}>{category.name}</Link>
//                     </h5>
//                 </div>
//             </div>
//         </div>
//     ))

//     const noCategories = (
//         <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
//             <h4>
//                 No Categories yet.  Why not create one?
//             </h4>
//         </div>
//     )

//     return(
//         <div>
//             <div className="py-5">
//                 <div className="row">
//                     {categories.length > 0 ? allCategories : noCategories}
//                 </div>
//             </div>
//         </div>

//     )

// }

// export default Categories

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from './actions/CategoriesActions'
import { loadingMessage } from './actions/SessionActions'

const Categories = () => {

    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories.allCategories)
    const loading    = useSelector(state => state.categories.loading)
    const hasErrors  = useSelector(state => state.categories.hasErrors)

    let allCategories, noCategories

    useEffect( () => {
        dispatch(fetchCategories())
    }, [])

    if (categories) {
        allCategories = (

        )
    }

    return(

    )

}

export default Categories