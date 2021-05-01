import React,{ useState, useEffect }from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {useStateValue} from "./DataLayer"
import getAlbumList from "./getAlbumList"
import Album from "./Album"
import Artist from "./Artist"
import Sidebar from "./Sidebar"
import Footer from "./Footer"

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
                    <div className="app__body">
                        <Sidebar {...props} />
                        <Route path='/artist/:id'>
                            <Artist {...props}/>
                        </Route>
                        {/* <Route path='/album/:id'>
                            <Album {...props}/>
                        </Route> */}
                    </div>
                    <div className="footer">
                        <Footer {...props} />
                    </div>
                </div>
            </Switch>
        </Router>

        <style jsx global>{`
         body{
             margin: 0px;
             padding: 0px;
         }
        `}
        </style>

        <style jsx>{`
        .app {
            display: flex;
            width: 100%;
            flex-direction: column;
        }
        .app__body {
            width: 90%;
            display: flex;
            flex-grow: 1;
        }
        .footer {
            position: fixed;
            display: flex;
            justify-content: space-between;
            bottom: 0;
            padding: 20px;
            height: 65px;
            width: 97%;
            background-color: #282828;
        }
        `}
        </style>
        </div>
    );
};


export default App;