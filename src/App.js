
import React, { useState, useEffect } from "react";
import './styles.css';
import Navbar from './components/Navbar';
import Home from './Home';
import Applications from './Applications';
import CreateApp from "./CreateApp";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  //logik innan return

  return (
    <Router>
      <div className="App">
        <div className="content">
        <Navbar />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/applications">
                <Applications />
              </Route>
              <Route exact path="/applications/create">
                <CreateApp />
              </Route>
            </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
