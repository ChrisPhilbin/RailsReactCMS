const getUserId = () => {
    id = document.addEventListener('DOMContentLoaded', () => {
        let node = document.getElementById('user-info')
        console.log(node, "NODE")
        let id = JSON.parse(node.getAttribute('user_data'))
        return id
    })
}