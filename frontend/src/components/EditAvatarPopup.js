import React, {useRef} from 'react';

function EditAvatarPopup(props) {
    const inputURL = useRef(null);

    function onSubmit(e) {
        e.preventDefault();

        const avatar = inputURL.current.value
        console.log(avatar)

        props.onUpdateAvatar(avatar);

        e.target.reset();

    }
    
    return (
        <section className={`popup popup_avatar ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close-button" onClick={props.isClose}></button>
                <h2 className="popup__title">Обновить аватар</h2>
                <form onSubmit={onSubmit} className="popup__form" name="save" noValidate>
                    <input ref={inputURL} id='input__name' type="url" className="popup__input popup__input_name" name="name" defaultValue=""
                        minLength="2" maxLength="200" required placeholder="URl" />
                    <span id='input__name-error' className="popup__error"></span>
                    <button className="popup__save" >Сохранить</button>
                </form>
            </div>
        </section>
    )
};

export default EditAvatarPopup;