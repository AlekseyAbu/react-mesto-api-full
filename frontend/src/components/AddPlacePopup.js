import React, {useRef} from 'react';

function AddPlacePopup(props) {
    const inputName = useRef(null);
    const inputURL = useRef(null);

    function onSubmit(e) {
        e.preventDefault();

        const data = {
            name: inputName.current.value,
            link: inputURL.current.value
        }

        props.onAddPlace(data)
        
        e.target.reset();
    }

    return (
        <section className={`popup popup_card ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close-button" onClick={props.isClose}></button>
                <h2 className="popup__title">Новое место</h2>
                <form onSubmit={onSubmit} className="popup__form" name="save" noValidate>
                    <input ref={inputName} id='input__cardname' type="text" className="popup__input popup__input_name popup__input_cardname"
                        name="name" defaultValue="" placeholder='Название' required minLength="2" maxLength="40" placeholder="Название" />
                    <span id='input__cardname-error' className="popup__error"></span>
                    <input ref={inputURL} id='input__link' type="url" className="popup__input popup__input_description popup__input_link"
                        name="link" defaultValue="" placeholder="Ссылка на картинку" required placeholder="Ссылка" />
                    <span id='input__link-error' className="popup__error"></span>
                    <button className="popup__save" >Сохранить</button>
                </form>
            </div>
        </section>
    )
}

export default AddPlacePopup;