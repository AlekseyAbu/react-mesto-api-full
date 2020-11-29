import React from 'react';
import imageLogo from '../images/Vector.svg';
import { Route, Switch, Link, useHistory } from 'react-router-dom';
import { removeToken } from '../utils/token';

function Header(props) {
    const headerEmail = `${props.loggedIn ? 'header__email' : 'header__email_hidden'}`;
    const history = useHistory();

    const signOut = () => {
        removeToken();
        history.push('/signin')
    }

    return (
        <section>
            <header className="header">
                <img className="header__logo" src={imageLogo} alt="Логотип" />
                <div className='header__info'>
                    <p className={headerEmail}>yandex@yandex.ru</p>

                    <Switch>
                        <Route exact path='/'>
                            <Link to='/signin' className='header__link' onClick={signOut}>Выйти</Link>
                        </Route>
                        <Route path='/signin'>
                            <Link to='/signup' className='header__link'>Регистрация</Link>
                        </Route>
                        <Route path='/signup'>
                            <Link to='/signin' className='header__link'>Войти</Link>
                        </Route>
                    </Switch>
                </div>
            </header>
        </section>
    )
}

export default Header;