import PopupWithForm from "./PopupWithForm";
import React from "react";


export default function EditAvatarPopup (props) {


    const inputRef = React.useRef();

    function handleSubmit (e) {
        e.preventDefault();

        props.onUpdateAvatar({
            link: inputRef.current.value
        })
    }

    return (
        <PopupWithForm name='avatar' title='Обновить аватар' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input className="popup__input popup__input_value_avatar" type="url" placeholder="Ссылка на картинку"
                   id="popup__avatar" name="avatar" required ref={inputRef}/>
            <span className="popup__input-error popup__avatar-error"/>
        </PopupWithForm>
    )
}