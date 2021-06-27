import React from 'react'
import success from '../images/Success.svg'
import fail from '../images/Fail.svg'

export default function InfoTooltip (props) {
    const popupState = props.isOpen ?'popup_opened' : '';
    return (
        <div className={`popup ${popupState}`}>
            <div className="popup__content">
                <button type="reset" className={`popup__close popup__close_place_${props.name}`} onClick={props.onClose} aria-label="Close"/>
                {props.isError ? <img src={fail} className="popup__image" alt='Ошибка'/> : <img src={success} className="popup__image" alt='Успех'/>}
                <p className='popup__text'>{props.isError ? 'Что-то пошло не так! Попробуйте ещё раз.' : 'Вы успешно зарегистрировались!'}</p>
            </div>
        </div>
    )
}
