import React,{ useState, useEffect }from "react";
import ReactDOM from "react-dom";
import Auth from "./Auth";
import Home from "./Home";
import GetAlbum from "./GetAlbum"
import App from "./App"
import { StateProvider }from "./DataLayer.js"
import reducer, { initialState }  from "./Reducer.js"
import Routing from "./Router"
import Test from "./GetAlbum"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <Routing />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);