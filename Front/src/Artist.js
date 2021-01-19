import React,{ useState, useEffect }from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useStateValue } from "./DataLayer"
import Sidebar from "./Sidebar"
import Body from "./Body"
import Album from "./Album"
import Footer from "./Footer"
import getAlbumList from "./getAlbumList"

const Artist = ({aristList}) => {
    
    const [{ raw_data, library_list, isAlbumList }, dispatch] = useStateValue();

    

    // console.log("albums is " + JSON.stringify(library_list));

    // if(!Object.keys(library_list).length){
    //     console.log("loading");
    // }
    // else{ 
    //     for(let i in library_list.items){
    //     list.push(library_list.items[i].album.artists[0].name);
    //     }
    //     list = list.sort()
    // }
    
    return (
        <div>
            <div className="player">
                <div className="player__body">
                    {/* {isAlbumList ? <Body/> : 
                    <h1>Nothing</h1>} */}
                   <Body/>
                </div>
                {/* <Footer /> */}
            </div>
            <style jsx>{`
                .player {
                    width: 100%;
                }
                .player__body {
                    display: flex;
                    flex-grow: 2;
                    width: 100%;
                }
                .test1 {
                    background-color: red;
                    width: 100%;

                    flex:0.2;
                }

                .test2 {
                    background-color: green;
                    width: 100%;
                    flex:0.3;

                }

            `}
            </style>
        </div>
    )
}

export default Artist;