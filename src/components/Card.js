import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Card ({card,onCardClick,onCardLike,onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);


    const isCardOwn = card.owner._id === currentUser._id;
    const isCardLiked = card.likes.some(i => i._id === currentUser._id);

    const cardDeleteButtonClassName = (`element__delete-btn ${isCardOwn ? 'element__delete-btn_active' : ''}`);
    const cardLikeButtonClassName = (`element__like-btn ${isCardLiked ? 'element__like-btn_active' : ''}`);

    function handleLikeClick () {
        onCardLike(card);
    }
    function handleDeleteClick () {
        onCardDelete(card._id);
    }

    return (
        <article className="element">
            <button aria-label="Удалить" className={cardDeleteButtonClassName} onClick={handleDeleteClick}/>
            <img src={card.link} alt={card.name} className="element__photo" onClick={() => onCardClick(card)}/>
            <div className="element__info">
                <h3 className="element__title">{card.name}</h3>
                <div className="element__like">
                    <button type="button" aria-label="Нравится" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
                    <p className="element__like-count">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}