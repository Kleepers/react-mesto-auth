import React from "react";
import {withRouter} from 'react-router-dom'

function Login (props) {

    const [mail,setMail] = React.useState('')
    const [pass,setPass] = React.useState('')

    function handleEmailChange (event) {
        setMail(event.target.value);
    }

    function handlePassChange (event) {
        setPass(event.target.value);
    }


    function handleSubmit (event) {
        event.preventDefault();
            props.onLogin(mail,pass)
                .then((data) => {
                    if (data.token) {
                        setPass('');
                        setMail('');
                        props.onAuthorization(true);
                        props.history.push('/');
                    }
                })
                .catch(err => console.log(err));
    }

    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            <p className='auth-form__title'>Вход</p>
            <input className='auth-form__input' type='email' placeholder='Email' onChange={handleEmailChange}/>
            <input className='auth-form__input' type='password' placeholder='Пароль' onChange={handlePassChange}/>
            <button className='auth-form__button' type='submit'>Войти</button>
        </form>
    )
}

export default withRouter(Login)