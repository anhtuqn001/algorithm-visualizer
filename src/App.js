import React from 'react';
import logo from './logo.svg';
import './App.css';
import PathFindingVisualizer from './PathFindingVisualizer/PathFindingVisualizer';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import MainPage from './MainPage/MainPage.js';
import {BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";


function App() {
  
  return (
    <Router>
    <Switch>
      <Route exact path="/">
        <MainPage/>
      </Route>
      <Route path="/path-finding">
        <PathFindingVisualizer/>
      </Route>
      <Route path="/sorting">
        <SortingVisualizer/>
      </Route>
    </Switch>
    </Router>
  );
}

export default App;
