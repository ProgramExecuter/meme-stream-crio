import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Nav from './Nav';
import Meme from './Meme';
import MemeBox from './MemeBox';
import Home from './Home';

function App() {
  return (
    <Router>
      <div>
        <Nav />

        <Switch>
          <Route path="/memes:id">
            <Meme />
          </Route>
          <Route path="/memes">
            <MemeBox />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;