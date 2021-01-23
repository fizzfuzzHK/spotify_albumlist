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
    const [artistList, setArtistList] = useState()
    const [albumList, setAlbumList] = useState()
    const [artist, setArtist] = useState()


    useEffect(async () => {
            console.log('useEffect');
            
            let list = await getAlbumList();
            setArtistList(list)
            console.log("artistList = " + artistList);
            
        }
    ,[])

    const props = {
      artistList : artistList,
      albumList : albumList,
      album_id : album_id,
      setAlbumId : setAlbumId,
      setAlbumList : setAlbumList,
      artist : artist,
      setArtist : setArtist
    }

    console.log('App');
      
    return (
        <div>
         <Router>
            <Switch>
                <div className="player__body">
                    <Sidebar {...props} />
                  
                    <Route path='/artist/:id'>
                        <Artist {...props}/>
                    </Route>

                    <Route path='/album/:id'>
                        <Album {...props}/>
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