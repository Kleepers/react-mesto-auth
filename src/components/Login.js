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

    React.useEffect (() => {
        setPass('')
        setMail('')
    },[props.cleaner])


    function handleSubmit (event) {
        event.preventDefault();
        props.onLogin(pass,mail)
    }

    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            <p className='auth-form__title'>Вход</p>
            <input className='auth-form__input' type='email' placeholder='Email' onChange={handleEmailChange} value={mail || ''}/>
            <input className='auth-form__input' type='password' placeholder='Пароль' onChange={handlePassChange} value={pass || ''}/>
            <button className='auth-form__button' type='submit'>Войти</button>
        </form>
    )
}

export default withRouter(Login)