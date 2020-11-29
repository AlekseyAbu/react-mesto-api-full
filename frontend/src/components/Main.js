import React from 'react';
import imagePlus from '../images/plus.svg';
import Card from './Card.js';
import {CurrentUserContext} from './contexts.js';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    
    return (
        <main className="main">
            <section className="profile">
                <button className="profile__foto" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }}></button>
                <div className="profile__description">
                    <div className="profile__name">
                        <h2 className="profile__title">{currentUser.name}</h2>
                        <button className="profile__title-buttom" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button className="profile__button" onClick={props.onAddPlace}>
                    <img className="profile__plus" src={imagePlus} alt="Плюс" />
                </button>
            </section>

            <section className="content">
                <ul className="content__cards">
                {props.dataCard.map((item, i) => <Card key={i} item={item} 
                onCardClick={props.onCardClick}
                onCardDelete={props.onCardDelete}
                onCardLike={props.onCardLike}
                onCardDislike={props.onCardDislike}
                />)}
                </ul>
            </section>         
        </main>
    )
}

export default Main;