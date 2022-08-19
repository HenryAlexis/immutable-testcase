import React from "react";
import Homepage from "./Homepage";
import Blockchains from "./Blockchains";
import Projects from "./Projects";
import Header from "./Header";
import Footer from "./Footer";
import {BrowserRouter as Router, Route} from "react-router-dom"

function App() {
    return <Router>
        <Header />
        <Route exact path="/">
            <Homepage />
        </Route>
        <Route exact path="/blockchains">
            <Blockchains />
        </Route>
        <Route exact path="/projects">
            <Projects />
        </Route>
        <Footer />
    </Router>
}

export default App;