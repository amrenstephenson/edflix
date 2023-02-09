import React from 'react';
import NavBar from '../components/NavBar';
import './login-signup.css';
import {serverURL} from '../index';

async function handleSubmit(event) {
	event.preventDefault();

	const form = event.target;
	const formData = new FormData(form);
	const json = JSON.stringify(Object.fromEntries(formData));

	const res = await fetch(`${serverURL}/api/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: json,
	});
	console.log("response:", res);
	if (res.ok) {
		window.location.href = '/';
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
						<input type="text" id="usrField" name="userName" required></input>
						<label htmlFor="usrField">Username</label>
					</div>
					<div className="item">
						<input id="pswdField" type="password" name="password" required></input>
						<label htmlFor="pswdField">Password</label>
					</div>
					<div className="item">
						<input id="confPswdField" type="password" required></input>
						<label htmlFor="confPswdField">Confirm Password</label>
					</div>

					<input type="submit" className="btn" value="SIGN UP" />
					<hr />
					<div className="msg">
						Already have account?&nbsp;
						<a href="/Login">Login</a>
					</div>
				</form>
			</div>
		</div>
	);
}
