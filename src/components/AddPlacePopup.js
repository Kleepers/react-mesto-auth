import React from "react";
import PopupWithForm from "./PopupWithForm";


export default function AddPlacePopup (props) {

    const [name,setName] = React.useState('');
    const [link,setLink] = React.useState('');

    React.useEffect(() => {
        setName('')
        setLink('')
    },[props.isOpen])

    function handleNameChange (event) {
        setName(event.target.value);
    }

    function handleLinkChange (event) {
        setLink(event.target.value);
    }

    function handleSubmit (event) {
        event.preventDefault();
        props.onAddPlace({
            place: name,
            image: link
        });
    }

    return (
        <PopupWithForm name='add' title='Новое место' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input type="text" placeholder="Название" id="popup__place"
                   className="popup__input popup__input_value_place" name="place" required minLength="2" maxLength="30" value={name} onChange={handleNameChange}/>
            <span className="popup__input-error popup__place-error"/>
            <input type="url" placeholder="Ссылка на картинку" id="popup__image"
                   className="popup__input popup__input_value_image" name="image" required value={link} onChange={handleLinkChange}/>
            <span className="popup__input-error popup__image-error"/>
        </PopupWithForm>
    )
}