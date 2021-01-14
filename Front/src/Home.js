import React,{ useState, useEffect }from "react";
import ReactDOM from "react-dom";
import Auth from "./Auth";
import LogIn from "./LogIn.js";
import { BrowserRouter as Router, Route } from "react-router-dom"
import {useDataLayerValue } from "./DataLayer"

const Home = () => { 

  const [token, setToken] = useState(null);

  const getTokenFromUrl = () => {
    const code = window.location.search
      .substring(1)
      .split('=')
    return code[1]
  }
  
  useEffect(() => {
    console.log(window.location.search)
    const hash = getTokenFromUrl();
    const token = hash
    if (token) {
      setToken(token)

    }
  }, [])

  return (
    <div>
      {token ? <Auth code={token}/> : <LogIn/>}
    </div>
  );
}

export default Home;

