import { authHeader } from '../helpers';

export const postsService = {
    getAll,
    delete: _delete,
    create: _create
};
const config = {
    apiUrl: 'http://localhost:3333'
}

function logout() {
    localStorage.removeItem('userToken');
}

function getAll() {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`${config.apiUrl}/`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/posts/${id}/delete`, requestOptions).then(handleResponse);
}

function _create(post) {
    console.log(post)
    let requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(post)
    };    
    requestOptions.headers['Content-Type'] = 'application/json'
    return fetch(`${config.apiUrl}/posts`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}