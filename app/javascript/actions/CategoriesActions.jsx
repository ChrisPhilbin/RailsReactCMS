
export const getCategories = () => {
    const url = '/api/v1/categories'
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error("Network response not ok")
        })
}