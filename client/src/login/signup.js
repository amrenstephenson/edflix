import React from "react";
import NavBar from '../components/NavBar';
import './login.css'


export default function Login() {
	return (
		<div>
			<div><NavBar /></div>
			<img id="logoImg" className="pt-5" src="images/edflix-logo.png" />


			<div className="loginBox">
				<h2>Sign Up</h2>
				<form action="">
					<div className="item">
						<input id="usrField" type="text" required></input>
						<label htmlFor="usrField">UserNane/Email</label>
					</div>
					<div className="item">
						<input id="pswdField" type="password" required></input>
						<label htmlFor="pswdField">Password</label>
					</div>
					<div className="item">
						<input id="confPswdField" type="password" required></input>
						<label htmlFor="confPswdField">Confirm Password</label>
					</div>

					<button className="btn">submit
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</button>
					<hr/>
					<div className="msg">Already have account?
                		<a href="/Login">Login</a>
            		</div>

				</form>
			</div>
		</div>
	);
}