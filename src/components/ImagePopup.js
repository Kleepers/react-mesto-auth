import React from 'react'

export default function ImagePopup (props) {
        const isOpen = props.card.name ?'popup_opened' :'';
        return (
            <div className={`popup popup_area_photo ${isOpen}`}>
                <div className="popup__content popup__content_place_photo">
                    <button type="button" aria-label="Закрыть попап" className="popup__close popup__close_place_photo" onClick={props.onClose}/>
                    <img src={props.card.link} alt={props.card.name} className="popup__photo"/>
                    <h2 className="popup__heading popup__heading_place_photo">{props.card.name}</h2>
                </div>
            </div>
        )
    }