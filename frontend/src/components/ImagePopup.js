import React from 'react';

function ImagePopup(props) {
    // console.log(props.card)
    return(
        <section className={`popup popup-img ${Object.keys(props.card).length > 0 ? 'popup_opened' : ''}`} >
              <div className="popup-img__container">
                <button className="popup__close-button popup__close-button_img" onClick={props.onClose}></button>
                <img className="popup-img__img" src={props.card.link} alt="#" />
                <p className="popup-img__text"></p>
              </div>
            </section>
    )
}

export default ImagePopup;