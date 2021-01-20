import React,{ useState, useEffect }from "react";
import { useStateValue } from "./DataLayer"
import axios from "axios"

const Album = (album_id) => {
    const [{ library_list, albums, isAlbumList, selected_album}, dispatch] = useStateValue();
    const [trackList, setTrackList] = useState([])
    console.log('Album');
    
    var list = []
    if(!Object.keys(albums).length){
        console.log("loading");
    }
    else{ 
    var tmp = "Various Artists"
    
    for(var i in albums){
        list.push(albums);
        }
        console.log(albums);
        
    }

    useEffect(() => {
        console.log('api send from album.js ' + album_id.album_id);
        let id = album_id.album_id
        axios.post(`http://localhost:8888/gettracks`, {id})
        .then(res => {            
            console.log("tracks " + JSON.stringify(res));
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

    })}, [album_id]);
    
    const handleOnClick = (id) => {
        
    }
    return (
        <div>
            <div className="album">
                {Object.keys(albums).length ? <h1 className="album__title">{albums[0].album}</h1> : <div></div>}
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