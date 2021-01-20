import React,{ useState, useEffect }from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {useStateValue} from "./DataLayer"
import getAlbumList from "./getAlbumList"
import Album from "./Album"
import Artist from "./Artist"
import Sidebar from "./Sidebar"

const App = () => {
  
    const [{ raw_data, library_list, isAlbumList }, dispatch] = useStateValue();
    const [album_id, setAlbumId] = useState()

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
      console.log(album_id);
      
    return (
        <div>
         <Router>
            <Switch>
                <div className="player__body">
                    <Sidebar  />
                  
                    <Route path='/artist/:id'>
                        <Artist album_id={album_id} setAlbumId = {setAlbumId}/>
                    </Route>

                    <Route path='/album/:id'>
                        <Album album_id={album_id}/>
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