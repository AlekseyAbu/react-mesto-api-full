import { render } from '@testing-library/react';
import React, { useState } from 'react';
import { useEffect, Link, useHistory, withRouter } from 'react-router-dom';
import * as mestoAuth from '../mestoAuth.js';
import { setToken } from '../utils/token';

function Login(props) {
    const [data, setData] = useState({
        email: '',
        password: ''
    });   
    const history = useHistory();
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const { email, password } = data;
        console.log(!email || !password)
        if (!email || !password) {
            return;
        }
        props.authorizeMesto(data);
    }
    return (
        <section>

            <div className='login'>
                <h2 className="login__title">Вход</h2>
                <form className="login__form" noValidate onSubmit={handleSubmit}>
                    <input type="email" className="login__input" name="email" defaultValue=""
                        required placeholder="Email" defaultValue={data.email} onChange={handleChange} />
                    <span id='login__email-error' className="login__error"></span>
                    <input id='login__password' type="text" className="login__input" name='password'
                        defaultValue="" required placeholder="Password" defaultValue={data.password} onChange={handleChange} />
                    <span id='login__description-error' className="popup__error"></span>
                    <button className="login__save" >Войти</button>
                </form>
            </div>

        </section>

    )

};

export default withRouter(Login);