import './App.css';
import NavBar from './components/NavBar';

export default function Home() {
	return (
		<div className="App">
			<header>
				<NavBar></NavBar>
			</header>
			<main>
				<br></br>
				<p>Welcome to EDFLIX</p>
			</main>
		</div>
	);
}
