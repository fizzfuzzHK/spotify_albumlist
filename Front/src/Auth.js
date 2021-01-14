import React,{ useState, useEffect }from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const Auth = ({code}) => {

    const [albums, setAlbums] = useState({});

    useEffect(() => {
        axios.post(`http://localhost:8888/auth`, {code})
            .then(res => {            
                console.log(res);
                window.location.href = "/getalbum"
            })
    },[])
    
    return (
        <div>
        </div>
    )
}

export default Auth;