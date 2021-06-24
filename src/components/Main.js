import React from 'react'
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Main (props) {

    const currentUser = React.useContext(CurrentUserContext)

    return (
        <main className="content">

            <section className="profile">
                <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})`}} onClick={props.onEditAvatar}>
                    <button className="profile__edit-avatar" />
                    <div className="profile__avatar-overlay"/>
                </div>
                <div className="profile__info">
                    <div className="profile__nickname">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button type="button" className="profile__edit-btn profile__popup-btn" onClick={props.onEditProfile}/>
                    </div>
                    <h2 className="profile__description">{currentUser.about}</h2>
                </div>
                <button type="button" className="profile__add-btn profile__popup-btn" onClick={props.onAddPlace}/>
            </section>

            <section className="elements">
                {props.cards.map(function(card) {
                    return (
                        <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
                    )
                })}
            </section>

        </main>
    )
}


