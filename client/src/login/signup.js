import React from "react";
import NavBar from '../components/NavBar';
import './login.css'


export default function Login() {
	return (
		<div>
			<div><NavBar /></div>
			<img id="logoImg" class="pt-5" src="images/edflix-logo.png" />


			<div class="loginBox">
				<h2>Sign Up</h2>
				<form action="">
					<div class="item">
						<input type="text" required></input>
						<label for="">UserNane/Email</label>
					</div>
					<div class="item">
						<input type="password" required></input>
						<label for="">Password</label>
					</div>
					<div class="item">
						<input type="password" required></input>
						<label for="">Confirm Password</label>
					</div>

					<button class="btn">submit
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</button>
					<hr/>
					<div class="msg">Already have account?
                		<a href="/Login">Login</a>
            		</div>

				</form>
			</div>
		</div>
	);
}