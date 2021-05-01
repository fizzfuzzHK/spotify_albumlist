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
import Sidebar from "./Sidebar";
import Album from "./Album"


const Routing = () => {    
    return (
        <div>
        <Router>
            <Switch>
                <Route path='/home'>
                    <Home />
                </Route>

                <Route path='/'>
                        <App />
                </Route>
            </Switch>
        </Router>
        <style jsx>{`
        .player__body {
                    display: flex;
                    flex-grow: 2;
                    width: 100%;
                }
        `}
        </style>
        </div>
    );
};

export default Routing;