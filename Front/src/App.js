import React,{ useState, useEffect }from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {useStateValue} from "./DataLayer"
import getAlbumList from "./getAlbumList"
import Album from "./Album"
import Artist from "./Artist"
import Sidebar from "./Sidebar"

const App = () => {
  
    const [{ raw_data, library_list, isAlbumList }, dispatch] = useStateValue();
    const [albumId, setAlbumId] = useState()
    const [sourceData, setSourceData] = useState()
    const [artistList, setArtistList] = useState()
    const [albumList, setAlbumList] = useState()
    const [currentArtist, setCurrentArtist] = useState({id:"", name:""})
    


    useEffect(async () => {            
            let list = await getAlbumList();            
            setSourceData(list)
            // console.log("artistList = " + artistList);
            
        }
    ,[])

    const props = {
      sourceData : sourceData,
      artistList: artistList,
      albumList : albumList,
      albumId : albumId,
      setAlbumId : setAlbumId,
      setAlbumList : setAlbumList,
      currentArtist : currentArtist,
      setCurrentArtist : setCurrentArtist,
      setArtistList:setArtistList
    }
      
    return (
        <div>
         <Router>
            <Switch>
                <div className="app">
                    <Sidebar {...props} />
                  <div className="app__body">
                    <Route path='/artist/:id'>
                        <Artist {...props}/>
                    </Route>

                    {/* <Route path='/album/:id'>
                        <Album {...props}/>
                    </Route> */}
                    </div>
                </div>
            </Switch>
        </Router>

        <style jsx>{`
        .app {
                    display: flex;
                    flex-grow: 2;
                    width: 100%;
                }
        .app__body {
          width: 90%;
        }
        `}
        </style>
        </div>
    );
};


export default App;