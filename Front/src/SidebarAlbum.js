import React from 'react';
import { useStateValue } from "./DataLayer"
import { withRouter } from 'react-router';

const SidebarAlbum = withRouter(({history, ...props}) => {
    console.log('SidebarAlbum');
    console.log(props);

    const [{ library_list, albums, isAlbumList }, dispatch] = useStateValue();
    
    
      
    var list = []
    if(props.artistList === undefined){
        console.log("loading");
    }
    else{ 
        list =Object.keys(props.artistList);
        list = list.sort()
        console.log('function list' + JSON.stringify(props.artistList["King Princess"][1]));

        

    }

    
    const handleOnClick =  (name) => {

        var tmp = props.artistList[name]
        console.log("tmp = "+JSON.stringify(tmp, null, 2));
        
        // for (let i in props.artistList[name]){
        //  tmp.push =  props.artistList[name]
        // }
        // dispatch({
        //     type: "SET_ALBUM_LIST",
        //     isAlbumList: true,
        // })  
        console.log('tmp = ' + JSON.stringify(tmp, null, 2));
        
        
        props.setArtist(name)


        // dispatch({
        //     type: "SET_ARTIST",
        //     artist: name,
        // })  

        // dispatch({
        //     type: "SET_ALBUMS",
        //     albums: tmp,
        // })   
        

        
        props.setArtist(name)

        props.setAlbumList(tmp)
        // console.log(props.albumList);
        
        history.push(`/artist/${name}`);
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
});

export default SidebarAlbum;