export const authHeader = () => {
    let userToken = JSON.parse(localStorage.getItem('userToken'))
    if (userToken) {
        return { 'Authorization': 'Bearer ' + userToken }
    } else {
        return {}
    }
}