import React from 'react'

export default function PopupWithForm (props) {
    const popupState = props.isOpen ?'popup_opened' : '';
    return (
        <div className={`popup popup_area_${props.name} ${popupState}`}>
            <form className="popup__content popup__validation" name={`${props.name}`} onSubmit={props.onSubmit}>
                <button type="reset" className={`popup__close popup__close_place_${props.name}`} onClick={props.onClose} aria-label="Close"/>
                <h2 className="popup__heading">{props.title}</h2>
                {props.children}
                <button type="submit" className={`popup__submit popup__submit_place_${props.name}`}>Подтвердить</button>
            </form>
        </div>
    )
}