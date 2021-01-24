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
                <img></img>
                <ul className="track_list">
                        {trackList.map((item, i) =>{
                            return(
                            <li className="list" onClick={() => handleOnClick(item)} key={i}>{i+1}  {item.name}</li>
                            
                            )
                        })}
                </ul>
            </div>
                <style jsx>{`

                .album {
                    width: 100vw;
                    height: 100vh;
                    flex: 0.9;
                    color: white;
                    padding: 0px;
                    background: linear-gradient(rgb(91, 87, 115), rgba(0,0,0,1));
                    background-color: green;
                    overflow: scroll;
                }
                

                .track_list {
                    list-style: none;
                    margin-left: 5px;
                    padding: 0;
                    overflow: scroll;
                }
                .list {
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