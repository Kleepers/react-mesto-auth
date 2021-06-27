import React from 'react'

class Auth {

    onRegister(authPass, authMail) {
        return fetch('https://auth.nomoreparties.co/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: authPass,
                email: authMail
            })
        })
            .then(res => res.json())
    }

    onLogin (mail,pass) {
        return fetch('https://auth.nomoreparties.co/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: pass,
                email: mail
            })
        })
            .then((res => res.json()))
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('jwt',data.token);
                    return data;
                }
                else {
                    return
                }
            })
            .catch(err => console.log(err))
    }

    checkToken(token) {
        return fetch('https://auth.nomoreparties.co/users/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.log(err))
    }
}

export const auth = new Auth();