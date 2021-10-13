import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Main from "./components/Main";
import About from "./components/pages/About";

function App() {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Route exact path="/" component={Main}/>
                <Route path="/about" component={About}/>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
