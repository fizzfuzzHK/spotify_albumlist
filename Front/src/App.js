import React,{ useState, useEffect }from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {useStateValue} from "./DataLayer"
import getAlbumList from "./getAlbumList"
import Album from "./Album"
import Artist from "./Artist"
import Sidebar from "./Sidebar"
import Body from "./Body"

const App = () => {
  
    const [{ raw_data, library_list, isAlbumList }, dispatch] = useStateValue();
    
    useEffect(async () => {
            console.log('useEffect');
            
            const list = await getAlbumList();

            dispatch({
                type: "SET_LIBRARY_LIST",
                library_list: list,
            })      
            console.log('test');
            
            dispatch({
                type: "SET_RAW_DATA",
                raw_data: list,
            })    
            
            console.log('test2');

            dispatch({
              type: "SET_RAW_DATA",
              raw_data: list,
          })            
          console.log('test3');
          
        }
    ,[])
    console.log('App');

    return (
        <div>
         <Router>
            <Switch>
                <div className="player__body">
                    <Sidebar />
                  
                    <Route path='/artist/:id'>
                        <Body />
                    </Route>

                    <Route path='/album'>
                        <Album />
                    </Route>
                </div>
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


export default App;