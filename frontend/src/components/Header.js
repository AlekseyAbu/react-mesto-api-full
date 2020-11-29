import React from 'react';
import imageLogo from '../images/Vector.svg';
import { Route, Switch, Link, useHistory } from 'react-router-dom';
import { removeToken } from '../utils/token';

function Header(props) {
    const headerEmail = `${props.loggedIn ? 'header__email' : 'header__email_hidden'}`;
    const history = useHistory();

    const signOut = () => {
        removeToken();
        history.push('/sign-up')
    }

    return (
        <section>
            <header className="header">
                <img className="header__logo" src={imageLogo} alt="Логотип" />
                <div className='header__info'>
                    <p className={headerEmail}>yandex@yandex.ru</p>

                    <Switch>
                        <Route exact path='/'>
                            <Link to='/sign-up' className='header__link' onClick={signOut}>Выйти</Link>
                        </Route>
                        <Route path='/sign-up'>
                            <Link to='/sign-in' className='header__link'>Регистрация</Link>
                        </Route>
                        <Route path='/sign-in'>
                            <Link to='/sign-up' className='header__link'>Войти</Link>
                        </Route>
                    </Switch>
                </div>
            </header>
        </section>
    )
}

export default Header;