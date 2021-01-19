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
        console.log(albums);

    }

    
    return (
        <div>
            {Object.keys(albums).length ? <h1>{albums[0].album}</h1> : <div><h1>test</h1></div>}
        </div>
    );
};


export default Album;