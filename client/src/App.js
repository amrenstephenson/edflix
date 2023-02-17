import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import PageNotFound from "./PageNotFound";
import Login from "./login/login";
import Signup from "./login/signup"
import  LearningJournal from  './LearningJournal/LJ'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/login" exact element={<Login />} />
				<Route path="/signup" exact element={<Signup />} />
				<Route path="/LearningJournal" exact element={<LearningJournal />} />
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

