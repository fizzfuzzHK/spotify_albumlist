import React from "react";
import ReactDOM from "react-dom";

const clinetId = "8ac881cc0bfc4bf1b8cab540c8997242"
const redirectUrl = "http://localhost:8080/home"
const authEndpoint = 'https://accounts.spotify.com/authorize';

const scopes = [
  "user-read-currently-playing",
  "user-library-read"
]

const auth_url = `${authEndpoint}?client_id=${clinetId}&response_type=code&redirect_uri=${redirectUrl}&scope=${scopes[0]} ${scopes[1]}`

console.log(auth_url)

const LogIn = () => {
    return (
        <div>
            <div className="login">
                <a href = {auth_url}>Spotifyにログイン</a>
            </div>

            <style jsx>{`
                .login {
                    display: grid;
                    place-items: center;
                    height: 100vh;
                    background-color:  black;
                }
                .login > a {
                    padding: 20px;
                    border-radius: 99px;
                    background-color: #1db954;
                    font-weight: 800;
                    color: white;
                    text-decoration: none;                                        
                }

            `}</style>
        </div>
    )
}

export default LogIn;