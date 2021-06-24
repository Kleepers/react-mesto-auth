import Header from './Header'
import Main from './Main'
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from 'react';
import {api} from '../utils/api';
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

export default function App() {


    function handleEditProfileClick  () {
        setIsEditProfileOpen(true)
    }

    function handleEditAvatarClick () {
        setIsEditAvatarPopupOpen(true)
    }

    function handleAddPlaceClick () {
        setIsAddPlacePopupOpen(true)
    }

    function handlePlaceDeletePopupOpen () {
        setIsPlaceDeletePopupOpen(true)
    }

    function handleCardClick (card) {
        setSelectedCard(card)
    }

    const [isEditProfilePopupOpen,setIsEditProfileOpen] = React.useState(false);
    const [isEditAvatarPopupOpen,setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen,setIsAddPlacePopupOpen] = React.useState(false);
    const [isPlaceDeletePopupOpen,setIsPlaceDeletePopupOpen] = React.useState(false);


    const [selectedCard,setSelectedCard] = React.useState({name: '', link: ''});

    const [currentUser,setCurrentUser] = React.useState({});

    const [cards,setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getUserInfoApi(),api.getInitialCards()])
            .then(([userData,initialCards]) => {
                setCards(initialCards);
                setCurrentUser(userData);
            })
            .catch(err => console.log(`Ошибка при получении данных: ${err}`))
    }, [])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id,!isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch(err => console.log(`Ошибка: ${err}`))
    }

    function handleCardDelete(cardToDeleteId) {
        api.deleteCard(cardToDeleteId).then(() => {
            setCards(cards.filter(function(card) {
                return card._id !== cardToDeleteId;
            }))
        })
            .catch(err => console.log(`Ошибка: ${err}`))
    }

    function closeAllPopups () {
        setIsEditProfileOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsPlaceDeletePopupOpen(false);
        setSelectedCard({name: '', link: ''});
    }

    function handleUpdateUser (formData) {
        api.updateUserInfo(formData)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
        })
            .catch(err => console.log(`Ошибка: ${err}`))
    }

    function handleUpdateAvatar (formData) {
        api.updateUserAvatar(formData).then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        })
            .catch(err => console.log(`Ошибка: ${err}`))
    }

    function handleAddPlaceSubmit (formData) {
        api.addNewCard(formData).then((res) => {
            setCards([res,...cards]);
            closeAllPopups();
        })
            .catch(err => console.log(`Ошибка: ${err}`))
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
        <div className="page">

            <Header/>
            <Main onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardDelete={handleCardDelete}
                  onCardLike={handleCardLike}
                  cards={cards}
            />
            <Footer/>
            <EditProfilePopup onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser}/>

            <AddPlacePopup onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmit}/>
            <EditAvatarPopup onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar}/>

            <PopupWithForm name='delete' title='Вы уверены?' isOpen={isPlaceDeletePopupOpen} onClose={closeAllPopups}/>

            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
            
        </div>
        </CurrentUserContext.Provider>
  );
}


