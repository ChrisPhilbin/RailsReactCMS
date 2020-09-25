export const getToken = () => {
    document.querySelector('meta[name="csrf-token"]').content
}

export const isLoggedIn = (user_id) => {
    return (user_id != "not_signed_in" ? true : false)
}

export const newPostButton = () => {
    return (
        <div>
            
        </div>
    )
}