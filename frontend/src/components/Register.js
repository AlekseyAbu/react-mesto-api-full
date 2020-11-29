import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

function Register(props) {
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data)
        props.registerMesto(data)
    }

    return (
        <section>
            <div className='login'>
                <h2 className="login__title">Регистрация</h2>
                <form className="login__form" noValidate onSubmit={handleSubmit}>
                    <input type="email" className="login__input" name="email" defaultValue=""
                        required placeholder="Email" defaultValue={data.email} onChange={handleChange} />
                    <span id='login__email-error' className="login__error"></span>
                    <input id='login__password' type="text" className="login__input" name='password'
                        defaultValue="" required placeholder="Пароль" defaultValue={data.password} onChange={handleChange} />
                    <span id='login__description-error' className="popup__error"></span>
                    <button className="login__save" >Зарегистрироваться</button>
                    <p className='login__auth'>Уже зарегистрированы? Войти</p>
                </form>
            </div>
        </section>
    )
};

export default withRouter(Register);