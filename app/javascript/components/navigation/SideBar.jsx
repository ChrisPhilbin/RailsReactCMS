import React from 'react'
import CategoriesWidget from './widgets/CategoriesWidget'

const SideBar = () => {

    return(
        <div className="sidebar-column">
            {<CategoriesWidget />}
        </div>
    )
}

export default SideBar