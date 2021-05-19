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
        <>
            <div className="album">
                {!props.albumList === undefined ? <h1 className="album__title">title</h1> : <div></div>}
                <div className="album__info">
                    <div className="album__header">
                        <img className = "album__image" src={albums[albumIndex]["image"]}/>
                        <div className="album__metadata">
                            <div className="album__title">{albums[albumIndex]["albumName"]}</div>
                            <div className="artist__name">{data[artistId]["artistName"]}</div>
                            <div className="album__genre">{albums[albumIndex]["year"]}</div>
                            <div className="album__buttons"></div>
                        </div>
                    </div>
                    <div className="tracks">
                            {tracklist.map((item, i) =>{
                                return(
                                <div className="tracks__list" onClick={() => handleOnClick(item)} key={i}>
                                    <div className="tracks__list__container">
                                        <div className="track__id">
                                            {i+1}  
                                        </div>
                                        <div className="track__name">
                                            {item.name} 
                                        </div>
                                        <div className="track__time">5:21</div>
                                    </div>
                                </div>
                                
                                )
                            })}
                    </div>
                </div>
            </div>
                <style jsx>{`
                .album {
                    flex-grow: 1;
                    height: 100vh;
                    background-color: whitesmoke;
                    color: black;
                    padding: 40px;
                    padding-right: 40px;
                    margin-top: 55px;
                    {/* background: linear-gradient(rgb(91, 87, 115), rgba(0,0,0,1)); */}
                    overflow: scroll;
                    {/* border: red solid 1px; */}
                }
                
                .album__image {
                    width: 270px;
                    height: 270px;
                }

                .album__header {
                    display: flex;
                }
                .album__metadata{
                    padding-left: 40px;
                }
                .album__info {
                    margin-left: 40px;

                }

                .album__title {
                    margin-top: 90px;
                    line-height: 1.24;
                    font-size: 26px;
                    font-weight: 600;
                    letter-spacing:0;
                }

                .artist__name {
                    line-height: 1.24;
                    font-size: 26px;
                    color: red;   
                }

                .album__genre {
                    font-size: 14px;
                    line-height: 1.7;
                    font-weight: 300;
                }

                .tracks {
                    list-style: none;
                    margin-top: 40px;
                    margin-left: 5px;
                    padding: 0;
                    overflow: scroll;
                    display: table;
                    width: 100%;
                }
                .tracks__list {
                    width: 100%;
                    display: table-row;
                    position: relative;
                    font-size: small;
                    padding: 5px 20px;
                    color: grey;
                    cursor: pointer;
                    transition: 100ms color ease-in;
                    margin-left: 0px;
                }
                .tracks__list__container {
                    display: flex;
                    align-items: center;
                    height: 46px;
                    max-width: 100%;
                }
                .track__id {
                    display: inline-flex;
                    font-size: 13px;
                    margin-right: 12px;
                }
                .track__name {
                    display: inline-flex;
                    font-size: 13px;
                    color: black;
                }
                .track__time {
                    margin-left:auto;
                    font-size: 13px;
                    margin-right: 200px;
                }
                .list:hover {
                    color: white
                }
            `}</style>

        </>
    );
};


export default Album;