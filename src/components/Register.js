import React from 'react'
import {withRouter,Link} from 'react-router-dom'

function Register (props) {

    const [authMail,setAuthMail] = React.useState('')
    const [authPass,setAuthPass] = React.useState('')

    function handleEmailChange (event) {
        setAuthMail(event.target.value);
    }

    function handlePassChange (event) {
        setAuthPass(event.target.value);
    }

    function handleSubmit (event) {
        event.preventDefault();
        props.onRegister(authPass,authMail);
    }

    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            <p className='auth-form__title'>Регистрация</p>
            <input className='auth-form__input' type='email' placeholder='Email' onChange={handleEmailChange} value={authMail}/>
            <input className='auth-form__input' type='password' placeholder='Пароль' onChange={handlePassChange} value={authPass}/>
            <button className='auth-form__button' type='submit'>Зарегистрироваться</button>
            <Link className='auth-form__text' to='/sign-in'>Уже зарегистрированы? Войти</Link>
        </form>
    )
}

export default withRouter(Register);