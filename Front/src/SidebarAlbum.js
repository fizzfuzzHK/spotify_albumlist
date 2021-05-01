import React,{ useState, useEffect, useRef }from "react";
import { useStateValue } from "./DataLayer"
import { withRouter } from 'react-router';

const SidebarAlbum = withRouter(({history, ...props}) => {

    const [{ library_list, albums, isAlbumList }, dispatch] = useStateValue();
    
    const loadData = key => {
        const loadJSON = key =>
        key && JSON.parse(localStorage.getItem(key));

        let data = loadJSON("data")

        return data
    }

    let data = loadData("data")

    const isFirstRender = useRef(false)

    useEffect(() => { // このeffectは初回レンダー時のみ呼ばれるeffect
        isFirstRender.current = true
      }, [])

    let tmp = []
    let list = []
    let artistId =""

    
    tmp = Object.values(data);    
    for (let i in tmp){
        list.push([tmp[i]["artistName"],tmp[i]["id"]])
    }   
    list.sort()
    // console.log('function list' + JSON.stringify(props.sourceData,null,2));
    
    

    useEffect(() => {
        props.setArtistList(list)

    },[])
  
    useEffect(() => {
        if(isFirstRender.current) { // 初回レンダー判定
            isFirstRender.current = false // もう初回レンダーじゃないよ代入
          } else {
        console.log("album List " + props.albumList);
        history.push(`/artist/${props.currentArtist["id"]}`);
    }
    },[props.currentArtist])
    

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
      }

    const  handleOnClick =  (id) => {
        // var tmp = props.sourceData[]
        // console.log("tmp = "+ getKeyByValue(props.sourceData,name));
        
        // for (let i in props.artistList[name]){
        //  tmp.push =  props.artistList[name]
        // }
        // dispatch({
        //     type: "SET_ALBUM_LIST",
        //     isAlbumList: true,
        // })  
        
        props.setAlbumList(data[id]["albums"])
        props.setCurrentArtist({id:id, name:data[id]["artistName"]})


        // dispatch({
        //     type: "SET_ARTIST",
        //     artist: name,
        // })  

        // dispatch({
        //     type: "SET_ALBUMS",
        //     albums: tmp,
        // })   
        


        
    }

    return (
        <div>
            <div>
                <ul className="album__list">
                    {list.map((item, i) =>{
                        return<li className="list" onClick={() => handleOnClick(item[1])} key={i}>{item[0]}</li>
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
 
