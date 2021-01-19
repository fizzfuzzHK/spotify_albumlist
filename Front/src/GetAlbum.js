import React,{ useState, useEffect }from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useStateValue } from "./DataLayer"
import Sidebar from "./Sidebar"
import Body from "./Body"
import Album from "./Album"
import Footer from "./Footer"

const GetAlbum = () => {
    
    const [{ raw_data, library_list, isAlbumList }, dispatch] = useStateValue();

    let list = [];
    
    useEffect(() => {
        const getalbum = async() => {
            const response = await axios.get(`http://localhost:8888/getalbum`)
            const data = response.data; 
            console.log(data);
            
            let tmp = {}
            for(let i in data.items) {

                let artist = data.items[i].album.artists[0].name
                if (!tmp.hasOwnProperty(artist)){
                    tmp[artist] = [{
                        id: data.items[i].album.id,
                        album : data.items[i].album.name,
                        image: data.items[i].album.images[1].url,
                        tracks: data.items[i].album.tracks,
                        year: data.items[i].album.release_date
                    }]
                }
                else {
                    let length = tmp[artist].length                     
                    tmp[artist][length] = {
                        id: data.items[i].album.id,
                        album : data.items[i].album.name,
                        image: data.items[i].album.images[1].url,
                        tracks: data.items[i].album.tracks,
                        year: data.items[i].album.release_date
                    }
                }
        }        console.log(tmp);

            dispatch({
                type: "SET_LIBRARY_LIST",
                library_list: tmp,
            })      
          
            dispatch({
                type: "SET_RAW_DATA",
                raw_data: data,
            })            
        }
        getalbum()   
    },[])

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
                    {isAlbumList ? <Body/> : 
                    <h1>Nothing</h1>}
                    {/* <div className="test1">1</div>
                    <div className="test2">2</div> */}

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

export default GetAlbum;