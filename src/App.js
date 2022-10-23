

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Appbar from './components/Appbar'
import Student from './components/Student'
import Contact from './components/contact';
import ContactUs from "./components/contact";
import LoggedIn from './components/loggedin';
import Twillo from './components/twillo';
import Details from './components/details';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
       
        <Route path="/" element={<Student/>} />
        <Route path="/contact" element={<Contact/>} />
        
        <Route path="/loggedin" element={<LoggedIn/>} />
        <Route path="/twillo" element={<Twillo/>} />
        <Route path="/details" element={<Details />} />
        

        </Routes>
      </Router>
    
    
   
    </div>
  );
}

export default App;

