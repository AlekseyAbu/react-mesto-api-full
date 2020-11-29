import React from 'react';

function PopupWithForm(props) {
    
    return (
        <section className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close-button" onClick={props.isClose}></button>
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form" name="save" noValidate>
                    {props.children}
                    <button className="popup__save" >{props.text}</button>
                </form>
            </div>
        </section>
    )
}

export default PopupWithForm;