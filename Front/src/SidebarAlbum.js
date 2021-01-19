import React from 'react';
import { useStateValue } from "./DataLayer"

const SidebarAlbum = () => {

    const [{ library_list, albums, isAlbumList }, dispatch] = useStateValue();

    var list = []
    if(!Object.keys(library_list).length){
        console.log("loading");
    }
    else{ 
        list =Object.keys(library_list);
        list = list.sort()
    }
    
    const handleOnClick = (name) => {
        var tmp = library_list[name]

        dispatch({
            type: "SET_ALBUM_LIST",
            isAlbumList: true,
        })  

        dispatch({
            type: "SET_ARTIST",
            artist: name,
        })  

        dispatch({
            type: "SET_ALBUMS",
            albums: tmp,
        })   
        console.log(tmp)
    }

    return (
        <div>
            <div>
                <ul className="album__list">
                    {list.map((item, i) =>{
                        return<li className="list" onClick={() => handleOnClick(item)} key={i}>{item}</li>
                    })}
                </ul>
            </div>
            <style jsx>{`
                .album__list {
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

export default SidebarAlbum;