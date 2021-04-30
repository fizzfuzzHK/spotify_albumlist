import React , {useEffect}from 'react';
import {useStateValue} from "./DataLayer"
import MediaQuery from "react-responsive";
import { withRouter } from 'react-router';

const Artist = withRouter(({history,　...props })=> {
    console.log('Body');
    let artistName
    let list = []
    if(props.albumList === undefined){
        console.log("loading");
    }
    else{ 
    var tmp = "Various Artists"
    console.log('Albums=' + JSON.stringify(props.albumList));
    
    for(var i in props.albumList){
        list.push(props.albumList);
        }
    }

    useEffect(() => {
        artistName = props.sourceData
    },[props.currentArtist])
    
    const handleOnClick = (id) => {
        console.log("id is " + id)
        
        // dispatch({
        //     type: "SET_ALBUM_LIST",
        //     isAlbumList: false,
        // })  

        // dispatch({
        //     type: "SET_SELECTED_ALBUM",
        //     selected_album: id,
        // })  
        props.setAlbumId(id)
        history.push(`/album/${id}`);
    }

    // useEffect(() => {
    //     console.log("setState + " +album_id)

    // }, [album_id]);

    return (
        <div className="body">
            <div >
                
                <h1 className="artist__name">{artistName}</h1>
                {props.albumList != undefined ? 
                <div>
                    <MediaQuery query="(max-width: 1000px)">
                    <ul className="album__container_ipad">
                    {props.albumList.map((item, i) =>{
                        return<div className="body__element" onClick={() => handleOnClick(item["id"])}>

                            <img className="album__image" key={i} src={item["image"]} />
                            <div className="album__name" key={i}>{item["name"]}</div>
                            <div className="album__year" key={i}>{item["year"]}年</div>

                        </div>
                    })}
                    </ul>
                    </MediaQuery>
                    <MediaQuery query="(min-width: 1001px)">
                    <ul className="album__container_web">
                    {props.albumList.map((item, i) =>{
                        return<div className="body__element" onClick={() => handleOnClick(item["id"])}>

                            <img className="album__image" key={i} src={item["image"]} />
                            <div className="album__name" key={i}>{item["name"]}</div>
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
                    color: black;
                    padding: 0px;
                    background-color: rgb(245, 245, 245);
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