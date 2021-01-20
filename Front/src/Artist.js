import React , {useEffect}from 'react';
import {useStateValue} from "./DataLayer"
import MediaQuery from "react-responsive";
import { withRouter } from 'react-router';

const Artist = withRouter(({history, album_id, setAlbumId })=> {
    const [{ library_list, albums, artist, isAlbumList, selected_album }, dispatch] = useStateValue();
    console.log('Body');
    console.log(albums)
    var list = []
    if(!Object.keys(albums).length){
        console.log("loading");
    }
    else{ 
    var tmp = "Various Artists"
    console.log('Albums=' + albums);
    
    for(var i in albums){
        list.push(albums);
        }
    }
    
    const handleOnClick = (id) => {
        console.log(isAlbumList)
        
        dispatch({
            type: "SET_ALBUM_LIST",
            isAlbumList: false,
        })  

        dispatch({
            type: "SET_SELECTED_ALBUM",
            selected_album: id,
        })  
        setAlbumId(id)
        history.push(`/album/${id}`);
    }

    useEffect(() => {
        console.log("setState + " +album_id)

    }, [album_id]);

    return (
        <div className="body">
            <div >
                
                <h1 className="artist__name">{artist}</h1>
                {Object.keys(albums).length ? 
                <div>
                    <MediaQuery query="(max-width: 1000px)">
                    <ul className="album__container_ipad">
                    {albums.map((item, i) =>{
                        return<div className="body__element" onClick={() => handleOnClick(item["id"])}>

                            <img className="album__image" key={i} src={item["image"]} />
                            <div className="album__name" key={i}>{item["album"]}</div>
                            <div className="album__year" key={i}>{item["year"]}年</div>

                        </div>
                    })}
                    </ul>
                    </MediaQuery>
                    <MediaQuery query="(min-width: 1001px)">
                    <ul className="album__container_web">
                    {albums.map((item, i) =>{
                        return<div className="body__element" onClick={() => handleOnClick(item["album"])}>

                            <img className="album__image" key={i} src={item["image"]} />
                            <div className="album__name" key={i}>{item["album"]}</div>
                            <div className="album__year" key={i}>{item["year"]}年</div>

                        </div>
                    })}
                    </ul>
                    </MediaQuery>
                </div>
                : <div></div>}
               
            </div>
            <style jsx>{`
                .body {
                    width: 100%;
                    height: 100vh;
                    flex: 0.9;
                    color: white;
                    padding: 0px;
                    background: linear-gradient(rgb(91, 87, 115), rgba(0,0,0,1));
                    background-color: green;
                    overflow: scroll;

                }
                .artist__name {
                    font-size: 24px;
                    margin-left: 40px;
                    padding: 40px
                }

                .album__image {
                    display: block;
                    width:85%;
                    height:auto;
                    opacity: 1;
                    border-radius: 5px;

                }
                

               
                .album__name {
                    list-style: none;
                    padding: 0px;
                    font-size: 12px;
                    word-break: break-word;
                }

                .album__year {
                    font-size: small;
                    color: grey;
                    font-size: 12px;
                }

                .body__element {
                    cursor: pointer;

                }

                    .album__container_ipad {
                    margin: 40px;
                    padding: 40px;
                    padding-top: 0px;
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    grid-gap: 40px;
                    align-items: start;
                }
                
                    .album__container_web {
                    margin: 40px;
                    padding: 40px;
                    padding-top: 0px;
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    grid-gap: 40px;
                    align-items: start;
                }
                
                
        

              
            `}</style>
        </div>
    );
});


export default Artist;