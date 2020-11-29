import React, { useEffect, useState } from 'react';
import { CurrentUserContext } from './contexts.js';

function EditProfilePopup(props) {
    const [ name, setName ] = React.useState('');
    const [ about, setAbout ] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    function onSubmit(e) {
        e.preventDefault()
        const data = {
            name,
            about
        };
        props.onSubmitHandler(data);
        setName('');
        setAbout('');
    }

    useEffect(() => {
        setName(currentUser.name)
        setAbout(currentUser.about)
    }, [currentUser]);

    return (
        <section className={`popup popup_profile ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close-button" onClick={props.isClose}></button>
                <h2 className="popup__title">Редактировать профиль</h2>
                <form className="popup__form" name="save" onSubmit={onSubmit} noValidate>
                    <input id='input__name' type="text" className="popup__input popup__input_name" name="name" defaultValue=""
                        minLength="2" maxLength="40" required placeholder="Ваше имя?" value={name} onChange={e => setName(e.target.value)} />
                    <span id='input__name-error' className="popup__error"></span>
                    <input id='input__description' type="text" className="popup__input popup__input_description"
                        name="about" defaultValue="" minLength="2" maxLength="200" required placeholder="О себе" value={about} onChange={e => setAbout(e.target.value)} />
                    <span id='input__description-error' className="popup__error"></span>
                    <button className="popup__save" >Сохранить</button>
                </form>
            </div>
        </section>
    )
}

export default EditProfilePopup;