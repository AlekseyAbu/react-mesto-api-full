import React from 'react';
import { CurrentUserContext } from './contexts.js';

function Card({ item, onCardClick, onCardDelete, onCardLike, onCardDislike }) {
    function handleClick() {
        onCardClick(item);
    };
    function handleCardLike() {
        onCardLike(item)
    }
    function handleCardDislike() {
        onCardDislike(item)
    }
    function handleCardDelete() {
        onCardDelete(item._id)
    }
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = item.owner._id === currentUser._id;
    const isLiked = item.likes.some(i => i._id === currentUser._id);
    return (
        <li className="card">
            <button onClick={handleCardDelete} className={`card__basket ${isOwn ? 'card__basket_active' : ''}`}></button>
            {/* {isOwn && <button type="button" className='card__basket card__basket_active' onClick={onCardDelete}></button>} */}
            <img className="card__img" src={item.link} alt="Карачаевск" onClick={handleClick} />
            <div className="card__label">
                <h3 className="card__title">{item.name}</h3>
                <div className="card__conteiner-like">
                    <button onClick={() => { if (isLiked) { handleCardDislike() } else { handleCardLike() } }} className={`card__label-like ${isLiked ? 'card__label-like_black' : ''}`}></button>
                    {/* {isLiked && <button type="button" className='card__label-like card__label-like_black' onClick={onCardLike}></button>}{isLiked ? handleCardLike() : handleCardDislike()} */}
                    <p className="card__number-like">{item.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;

