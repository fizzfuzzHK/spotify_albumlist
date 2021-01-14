const express = require('express')
const cors = require('cors')
const axios = require('axios')
const bodyParser = require('body-parser');

const app = express()
const port = 8888

//client_id and client_secret of Spotify app
const client_id = "8ac881cc0bfc4bf1b8cab540c8997242"
const client_secret = "b750fbe8fb004ab18b6049f019ea2e2b"
const auth_base64  = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
let token = ""
app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// app.post('/getToken', (req, res) => {
   
//     axios.post('https://accounts.spotify.com/api/token', null, {
//     params: {
//     grant_type : "authorization_code",
//     code : req.body.code,
//     redirect_uri : "http://localhost:8080/"
//     },  
//     headers : {
//         Authorization: `Basic ${auth_base64}`
//     },
//     })
//     .then((res) => {
//         console.log(res.data.access_token)
//     })
//     .catch((error) => {
//         console.log(error);
        
//     })
    
// })

app.post('/auth', async (req, res) => {
    //get access_token
    const res_token = await axios.post('https://accounts.spotify.com/api/token', null, {
        params: {
            grant_type : "authorization_code",
            code : req.body.code, //code sent from Frontend
            redirect_uri : "http://localhost:8080/home"
        },  
        headers : {
            Authorization: `Basic ${auth_base64}`
        },
    })
    .catch((error) => console.log(error))
    res.send("200")
    console.log(res_token);
    
    token = res_token.data.access_token
    //get album lists
    
})

app.get('/getalbum', async (req,res) => {
    const api_result = await axios.get('https://api.spotify.com/v1/me/albums',{
        params: {
            limit: 50
        },
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    .catch((error) => console.log(error))

    const album_data = api_result.data
    console.log(album_data);
    
    res.json(album_data)
})


app.use((req) => {
    console.log(req.body.code)

})

app.listen(port, () => console.log('server is listening on port '+port))