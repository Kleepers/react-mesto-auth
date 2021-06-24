import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function EditProfilePopup (props) {

    const [name,setName] = React.useState('');
    const [description,setDescription] = React.useState('');

    const currentUser = React.useContext(CurrentUserContext);


    function handleNameChange (event) {
        setName(event.target.value);
    }

    function handleDescriptionChange (event) {
        setDescription(event.target.value);
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser,props.isOpen]);

    function handleSubmit (event) {
        event.preventDefault();
        props.onUpdateUser({
            name,
            info: description
        });
    }

    return(
        <PopupWithForm name="edit" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input type="text" placeholder="Ваше имя" id="popup__name" value={name || ''} onChange={handleNameChange}
                   className="popup__input popup__input_value_name" name="name" required minLength="2"
                   maxLength="40"/>
            <span className="popup__input-error popup__name-error"/>
            <input type="text" placeholder="О себе" id="popup__info" value={description || ''} onChange={handleDescriptionChange}
                   className="popup__input popup__input_value_info" name="info" required minLength="2"
                   maxLength="200"/>
            <span className="popup__input-error popup__info-error"/>
        </PopupWithForm>
        )
}