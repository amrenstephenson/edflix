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
        <Route path="/" exact caseSensitive element={<Home />} />
        <Route path="/login" exact caseSensitive element={<Login />} />
        <Route path="/signup" exact caseSensitive element={<Signup />} />
        <Route path="/learning-journal" exact caseSensitive element={<LearningJournal />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

