import React,{ useState, useEffect }from "react";
import { useLocation, withRouter } from 'react-router';
import { useStateValue } from "./DataLayer"
import axios from "axios"

const Album = ({...props}) => {
    const [trackList, setTrackList] = useState([])
    
    const loadData = key => {
        const loadJSON = key =>
        key && JSON.parse(localStorage.getItem(key));

        let data = loadJSON("data")

        return data
    }

    let data = loadData("data")

    const GetArtistIdfromURL = () => {
        let url = useLocation()
        const urlArray = url["pathname"].split('/')
        return urlArray[2]
    }
    let artistId = GetArtistIdfromURL()

    const GetAlbumIdfromURL = () => {
        let url = useLocation()
        const urlArray = url["pathname"].split('/')
        return urlArray[4]
    }
    let albumId = GetAlbumIdfromURL()

    var list = []
    if(props.albumList === undefined){
    }
    else{ 

    for(var i in props.albumList){
        list.push(props.albumList);
        }
        
    }

    let albums = data[artistId]["albums"]

    console.dir(albums)
    let albumIndex = null;
    for (var i=0; i<albums.length; i++) {
        if ( albums[i].id == albumId ) {
            albumIndex = i;
            break;
        }
    }
    
    let tracklist = []

    for (let i in albums[albumIndex]["tracks"]["items"]){
        tracklist[i] = albums[albumIndex]["tracks"]["items"][i]
    }

    console.dir(tracklist)

    useEffect(() => {
        let id = props.albumId
        axios.post(`http://localhost:8888/gettracks`, {id})
        .then(res => {            
            let tmp = []            
            for (let i in res.data.items){
                let d = res.data.items[i]
                tmp[i] = {
                    name : d.name,
                    id : d.id,
                    duration_ms : d.duration_ms,
                    external_urls: d.external_urls.spotify,
                    track_number :d.track_number,
                    uri : d.uri
                }                
            }
 
    setTrackList(tmp)

    })}, [props.albumId]);
    
    const handleOnClick = (id) => {
        
    }
    return (
        <div>
            <div className="album">
                {!props.albumList === undefined ? <h1 className="album__title">title</h1> : <div></div>}
                <img className = "album__image" src={albums[albumIndex]["image"]}/>
                <div className="album__info">
                    <div className="album__header">
                        <div className="album__title">{albums[albumIndex]["albumName"]}</div>
                        <div className="artist__name">{data[artistId]["artistName"]}</div>
                        <div className="album__genre">{albums[albumIndex]["year"]}</div>
                        <div className="album__buttons"></div>
                    </div>
                    <div className="tracks">
                            {tracklist.map((item, i) =>{
                                return(
                                <div className="tracks__list" onClick={() => handleOnClick(item)} key={i}>{i+1}  {item.name}</div>
                                
                                )
                            })}
                    </div>
                </div>
            </div>
                <style jsx>{`

                .album {
                    display: flex;
                    width: 100%;
                    height: 100vh;
                    flex: 0.9;
                    background-color: rgb(245, 245, 245);
                    color: black;
                    padding: 40px;
                    padding-right: 40px;
                    {/* background: linear-gradient(rgb(91, 87, 115), rgba(0,0,0,1)); */}
                    overflow: scroll;
                    {/* border: red solid 1px; */}
                }
                
                .album__image {
                    background-color: red;
                    width: 20vw;
                    height: 18vw;
                }

                .album__info {
                    display: flex;
                    flex-direction: column;
                    width: 80vw;
                    margin-left: 40px;

                }

                .album__title {
                    font-size: 30px;
                    font-weight: 800;
                }

                .artist__name {
                    font-size: 20px;   
                }

                .album__genre {
                    font-size: small;
                }

                .tracks {
                    list-style: none;
                    margin-top: 20px;
                    margin-left: 5px;
                    padding: 0;
                    overflow: scroll;
                    display: table;
                }
                .tracks__list {
                    display: table-row;
                    font-size: small;
                    padding: 5px;
                    color: grey;
                    cursor: pointer;
                    transition: 100ms color ease-in;
                    margin-left: 0px;
                }

                .list:hover {
                    color: white
                }
            `}</style>

        </div>
    );
};


export default Album;