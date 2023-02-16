import React from 'react';
import NavBar from '../components/NavBar';
import './login-signup.css';
import {serverURL} from '../index';

async function handleSubmit(event) {
	event.preventDefault();

	const form = event.target;
	const formData = new FormData(form);
	const json = JSON.stringify(Object.fromEntries(formData));

	const res = await fetch(`${serverURL}/api/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: json,
	});

	if (res.ok) {
		window.location.href = '/';
	} else {
		const err = await res.json();
		if (err.code === 'UNKNOWN_USERNAME') {
			alert('User not found.');
		} else if (err.code === 'INCORRECT_PASSWORD') {
			alert('Incorrect password.');
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
				<h2>Login</h2>
				<form onSubmit={handleSubmit}>
					<div className="item">
						<input id="usrField" type="text" name="userName" required></input>
						<label htmlFor="usrField">Username</label>
					</div>
					<div className="item">
						<input id="pwdField" type="password" name="password" required></input>
						<label htmlFor="pwdField">Password</label>
					</div>

					<div className="mt-2 mb-3" id="remChkContainer">
						<input className="form-check-input" type="checkbox" id="remPswdCheck" name="remember" value='1'></input>
						<label className="form-check-label" htmlFor="remPswdCheck">
							Remember me
						</label>
					</div>
					<input type="submit" className="btn" value="LOGIN" />
					<hr />
					{/* <a id="otherway" href="https://google.co.uk">
						<svg width="18px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
							<g>
								<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
								<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
								<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
								<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
								<path fill="none" d="M0 0h48v48H0z"></path>
							</g>
						</svg>
						<span>Login with Google</span>
					</a> */}
					<div className="msg">
						Don't have account?&nbsp;
						<a href="/sign">Sign up</a>
					</div>
				</form>
			</div>
		</div>
	);
}
