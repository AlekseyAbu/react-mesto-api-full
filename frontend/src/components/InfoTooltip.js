import React from 'react';
import imageSuccessfully from '../images/Union.svg';
import imageUnsuccessful from '../images/Union-no.svg';

function InfoTooltip(props) {
    return (
        <section className={`popup ${props.isInfoTooltip ? 'popup_opened' : ''}`}>

            {props.status === 'successfully' ?
                <div className="popup__container">
                    <button className="popup__close-button" onClick={props.isClose}></button>
                    <img className='popup__image-successfully' src={imageSuccessfully} alt='Успешно зарегестрировались' ></img>
                    <p className='popup__successfully-text'>Вы успешно зарегистрировались!</p>
                </div>
                :
                <div className="popup__container">
                    <button className="popup__close-button" onClick={props.isClose}></button>
                    <img className='popup__image-successfully' src={imageUnsuccessful} alt='Что-то пошло не так' ></img>
                    <p className='popup__successfully-text'>Что-то пошло не так! Попробуйте ещё раз.</p>
                </div>
            }
        </section>
    )

};

export default InfoTooltip;