import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";
import PrivateRoute from './components/PrivateRoute';
import BubblePage from './components/BubblePage';

function App() {
  const [colorList, setColorList] = useState([]);
  return (
    <Router>
      <div className="App">
        {/* <Route exact path="/" component={Login} /> */}
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}

        <Route path="/" component={Login} />
        <PrivateRoute path="/protected" component={BubblePage} />




      </div>
    </Router>
  );
}

export default App;
