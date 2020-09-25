export const getToken = () => {
    document.querySelector('meta[name="csrf-token"]').content
}

export const isLoggedIn = (user_id) => {
    return (user_id != "not_signed_in" ? true : false)
}

export const newPostButton = (
    <>
        <Link to={'/posts/new'} className="btn btn-primary" role="button">New post</Link>
    </>
)

export const signInButton = (
    <div>
        <a href="/user/sign_in"><Button className="btn btn-primary">Sign in</Button></a>
    </div>
)

export const editPostButton = (post_id) => {
    return(
        <>
            <Link to={'/posts/'+post_id+'/edit'} className="btn btn-primary" role="button">Edit post</Link>
        </>
    )
}

export const deletePostButton = () => {
    return(
        <>
            <Button className="btn btn-primary" onClick={deletePost}>Remove post</Button>
        </>
    )
}