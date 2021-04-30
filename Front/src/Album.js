import React,{ useState, useEffect }from "react";
import { useStateValue } from "./DataLayer"
import axios from "axios"

const Album = ({...props}) => {
    const [trackList, setTrackList] = useState([])
    console.log('Album');
    
    var list = []
    if(props.albumList === undefined){
        console.log("loading");
    }
    else{ 
    var tmp = "Various Artists"
    
    for(var i in props.albumList){
        list.push(props.albumList);
        }
        console.log(props.albumList);
        
    }

    useEffect(() => {
        console.log('api send from album.js ' + props.albumId);
        let id = props.albumId
        axios.post(`http://localhost:8888/gettracks`, {id})
        .then(res => {            
            console.log("tracks " + JSON.stringify(res,null,2));
            let tmp = []
            console.log(res.data.items.length);
            
            for (let i in res.data.items){
                let d = res.data.items[i]
                console.log("d is " + d);
                tmp[i] = {
                    name : d.name,
                    id : d.id,
                    duration_ms : d.duration_ms,
                    external_urls: d.external_urls.spotify,
                    track_number :d.track_number,
                    uri : d.uri
                }
                console.log(tmp);
                
            }
 
    setTrackList(tmp)

    })}, [props.albumId]);
    
    const handleOnClick = (id) => {
        
    }
    return (
        <div>
            <div className="album">
                {!props.albumList === undefined ? <h1 className="album__title">title</h1> : <div></div>}
                <img className = "album__image" src="https://i.scdn.co/image/ab67616d00001e022430f37a995a340f1c3b0efd"/>
                <div className="album__info">
                    <div className="album__header">
                        <div className="album__title">Hi Scores 2014 Edition - EP</div>
                        <div className="artist__name">Boards of Canada</div>
                        <div className="album__genre">エレクトロニック 2014年</div>
                        <div className="album__buttons"></div>
                    </div>
                    <div className="track_list">
                            {trackList.map((item, i) =>{
                                return(
                                <div className="list" onClick={() => handleOnClick(item)} key={i}>{i+1}  {item.name}</div>
                                
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
                    height: 20vw;
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

                .track_list {
                    list-style: none;
                    margin-top: 20px;
                    margin-left: 5px;
                    padding: 0;
                    overflow: scroll;
                    display: table;
                }
                .list {
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