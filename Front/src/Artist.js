import React , {useEffect}from 'react';
import {useStateValue} from "./DataLayer"
import MediaQuery from "react-responsive";
import { useLocation, withRouter } from 'react-router';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
  } from 'react-router-dom';
  import Album from "./Album"


const Artist = withRouter(({history,　...props })=> {
    const match = useRouteMatch();

    const loadData = key => {
        const loadJSON = key =>
        key && JSON.parse(localStorage.getItem(key));

        let data = loadJSON("data")

        return data
    }
    
    const GetArtistIdfromURL = () => {
        let url = useLocation()
        const urlArray = url["pathname"].split('/')
        return urlArray[2]
    }
    let artistId = GetArtistIdfromURL()

    let data = loadData("data")
    let artistName　= data[artistId]["artistName"]
    let albumList = data[artistId]["albums"]
    let list = []
    for(var i in albumList){
        list.push(albumList);
        }
    
    // if(props.albumList === undefined){
    // }
    // else{ 
    // var tmp = "Various Artists"
    // console.log("albumlist" + props.albumList);


    // useEffect(() => {
    //     console.log('artistName = props.currentArtist["name"]' + props.currentArtist["name"]);
        
    //     artistName = props.currentArtist["name"]
    // },[props.currentArtist])
    
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
        history.push(`/artist/${artistId}/album/${id}`);
    }

    // useEffect(() => {
    //     console.log("setState + " +album_id)

    // }, [album_id]);

    return (
        <Switch>    
            <Route path={`${match.path}/album/:id`}>
                <Album {...props}/>
            </Route>
            <Route path={`${match.path}`}>
                <div className="body">
                    <div >
                        <h1 className="artist__name">{artistName}</h1>
                        {albumList != undefined ? 
                        <div>
                            <MediaQuery query="(max-width: 1000px)">
                                <ul className="album__container_ipad">
                                {albumList.map((item, i) =>{
                                    return <div className="body__element" onClick={() => handleOnClick(item["id"])}>
                                                <img className="album__image" key={i} src={item["image"]} />
                                                <div className="album__name" key={i}>{item["albumName"]}</div>
                                                <div className="album__year" key={i}>{item["year"]}</div>
                                            </div>
                                })}
                                </ul>
                            </MediaQuery>
                            <MediaQuery query="(min-width: 1001px)">
                                <ul className="album__container_web">
                                {albumList.map((item, i) =>{
                                    return <div className="body__element" onClick={() => handleOnClick(item["id"])}>
                                                <img className="album__image" key={i} src={item["image"]} />
                                                <div className="album__name" key={i}>{item["albumName"]}</div>
                                                <div className="album__year" key={i}>{item["year"]}</div>
                                            </div>
                                })}
                                </ul>
                            </MediaQuery>
                        </div>
                        : <div></div>}
                    </div>
                    <style jsx>
                        {`
                        .body {
                            width: 100%;
                            height: 100vh;
                            flex: 0.9;
                            color: black;
                            margin-top: 55px;
                            padding: 0px;
                            background-color: rgb(245, 245, 245);
                            overflow: scroll;
                        }
                        .artist__name {
                            font-size: 24px;
                            margin-left: 40px;
                            padding-left: 40px;
                            padding-top: 20px;
                            padding-bottom: 30px;

                        }
                        .album__image {
                            display: block;
                            width:50px%;
                            height:auto;
                            opacity: 1;
                            border-radius: 5px;
                        }
                        .album__name {
                            list-style: none;
                            margin-top: 5px;
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
                        margin: 10px 40px;
                        padding: 40px;
                        padding-top: 0px;
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        grid-gap: 40px;
                        align-items: start;
                        }
                        `}
                    </style>
                </div>
            </Route>
        </Switch>
    );
});


export default Artist;