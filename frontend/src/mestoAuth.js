import { setToken } from './utils/token';
export const BASE_URL = 'http://api.mestoabu.students.nomoredomains.icu';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {       
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            Promise.reject(`Ошибка: ${response.status}`)
        })  
};


export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'     
        },
        body: JSON.stringify({ email, password })
    })
        .then((response) => {
            if(response.ok){
                return response.json()
            }
            Promise.reject(`Ошибка: ${response.status}`)
        })
        .then((data) => {
            console.log(data)
            if (data) {
                console.log(data)
                setToken(data.token);
                return data;
            } else {
                return;
            }
        }) 
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then((response => {
        
        if(response.ok){
            return response.json()
        }
        Promise.reject(`Ошибка: ${response.status}`)
    }))
        
}



