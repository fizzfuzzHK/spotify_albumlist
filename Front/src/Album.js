import React from 'react';
import { useStateValue } from "./DataLayer"

const Album = () => {
    const [{ library_list, albums, isAlbumList }, dispatch] = useStateValue();
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
    }

    console.log(albums);
    
    return (
        <div>
            {Object.keys(albums).length ? <h1>this is {albums[1].items}</h1> : <div></div>}
        </div>
    );
};


export default Album;