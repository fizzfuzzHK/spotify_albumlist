import React,{ useState, useEffect }from "react";
import ReactDOM from "react-dom";
import Auth from "./Auth";
import Home from "./Home";
import GetAlbum from "./GetAlbum"
import App from "./App"
import DataLayer from "./DataLayer.js"
import reducer, { initialState }  from "./Reducer.js"

import Test from "./GetAlbum"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const Routing = () => {
    return (
        <div>
        <Router>
            <Switch>
                <Route path='/home'>
                    <Home />
                </Route>
                <Route path='/getalbum'>
                    <GetAlbum />
                </Route>
                <Route path='/app'>
                    <App />
                </Route>
            </Switch>
        </Router>
        </div>
    );
};

export default Routing;