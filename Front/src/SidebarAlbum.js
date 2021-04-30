import React,{ useState, useEffect }from "react";
import { useStateValue } from "./DataLayer"
import { withRouter } from 'react-router';

const SidebarAlbum = withRouter(({history, ...props}) => {
    console.log('SidebarAlbum');
    console.log(props);

    const [{ library_list, albums, isAlbumList }, dispatch] = useStateValue();
    
    let tmp = []
    let list = []

    if(props.sourceData === undefined){
        console.log("loading");
    }
    else{ 
        tmp = Object.values(props.sourceData);    
        for (let i in tmp){
            list.push(tmp[i]["name"])
        }   
        list.sort()
        // console.log('function list' + JSON.stringify(props.sourceData,null,2));
        
    }

    useEffect(() => {
        props.setArtistList(list)

    },[])
    
    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
      }

    const handleOnClick =  (name) => {

        // var tmp = props.sourceData[]
        // console.log("tmp = "+ getKeyByValue(props.sourceData,name));
        
        // for (let i in props.artistList[name]){
        //  tmp.push =  props.artistList[name]
        // }
        // dispatch({
        //     type: "SET_ALBUM_LIST",
        //     isAlbumList: true,
        // })  
        let id = "6beUvFUlKliUYJdLOXNj9C"

        console.log('tmp = ' + JSON.stringify(tmp, null, 2));
        
        props.setCurrentArtist(id)


        // dispatch({
        //     type: "SET_ARTIST",
        //     artist: name,
        // })  

        // dispatch({
        //     type: "SET_ALBUMS",
        //     albums: tmp,
        // })   
        


        props.setAlbumList(props.sourceData[id]["album"])
        // console.log(props.albumList);
        
        history.push(`/artist/${id}`);
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
                    color: rgb(48, 48, 48);
                    cursor: pointer;
                    transition: 100ms color ease-in;
                    margin-left: 0px;
                }
                .list:hover {
                    color: rgb(0, 0, 0)
                }
            `}</style>
        </div>
    );
});

export default SidebarAlbum;
 
