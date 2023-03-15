import React from 'react';
import NavBar from '../components/NavBar';
import './login-signup.css';
import {serverURL} from '../index';

async function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const formObject = Object.fromEntries(formData);

  if (formObject.password !== formObject.confPassword) {
    alert('The passwords entered are not the same.');
    return;
  }
  delete formObject.confPassword;

  const formJson = JSON.stringify(formObject);

  const res = await fetch(`${serverURL}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formJson,
  });

  if (res.ok) {
    window.location.href = '/learning-journal';
  } else {
    const err = await res.json();
    if (err.code === 'SQLITE_CONSTRAINT') {
      alert('User already exists.');
    }
  }
}

export default function Login() {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <img id="logoImg" alt="edflix logo" className="pt-5" src="images/edflix-logo.png" />

      <div className="loginBox">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <input type="text" id="usrField" name="userName" className="loginField" required></input>
            <label htmlFor="usrField">Username</label>
          </div>
          <div className="item">
            <input id="pswdField" type="password" name="password" className="loginField" required></input>
            <label htmlFor="pswdField">Password</label>
          </div>
          <div className="item">
            <input id="confPswdField" type="password" name="confPassword" className="loginField" required></input>
            <label htmlFor="confPswdField">Confirm Password</label>
          </div>

          <input type="submit" className="btn" value="SIGN UP" />
          <hr />
          <div className="msg">
						Already have account?&nbsp;
            <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}
