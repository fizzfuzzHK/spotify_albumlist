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

app.post('/gettracks', async (req,res) => {
    console.log(req.body.id);
    
    const api_result = await axios.get(`https://api.spotify.com/v1/albums/${req.body.id}/tracks`,{
     
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    .catch((error) => console.log(error))

    const tracks_data = api_result.data
    console.log(tracks_data);
    
    

    res.json(tracks_data)
})


app.use((req) => {
    console.log(req.body.code)

})

app.listen(port, () => console.log('server is listening on port '+port))


// items: [
//     {
//       artists: [Array],
//       available_markets: [Array],
//       disc_number: 1,
//       duration_ms: 262079,
//       explicit: false,
//       external_urls: [Object],
//       href: 'https://api.spotify.com/v1/tracks/6TVs7Lap6ZcrpZk1xfOgtv',
//       id: '6TVs7Lap6ZcrpZk1xfOgtv',
//       is_local: false,
//       name: 'Perth',
//       preview_url: 'https://p.scdn.co/mp3-preview/310daa6666e98d78cbbcb36e79d98753f3c710ad?cid=8ac881cc0bfc4bf1b8cab540c8997242',
//       track_number: 1,
//       type: 'track',
//       uri: 'spotify:track:6TVs7Lap6ZcrpZk1xfOgtv'
//     },
//     {
//       artists: [Array],
//       available_markets: [Array],
//       disc_number: 1,
//       duration_ms: 232440,
//       explicit: false,
//       external_urls: [Object],
//       href: 'https://api.spotify.com/v1/tracks/4cawaZVzboa3UYqgR4kalj',
//       id: '4cawaZVzboa3UYqgR4kalj',
//       is_local: false,
//       name: 'Minnesota, WI',
//       preview_url: 'https://p.scdn.co/mp3-preview/bdea8f38f05aef63d517306759db6b5403c65e92?cid=8ac881cc0bfc4bf1b8cab540c8997242',
//       track_number: 2,
//       type: 'track',
//       uri: 'spotify:track:4cawaZVzboa3UYqgR4kalj'
//     },
//     {
//       artists: [Array],
//       available_markets: [Array],
//       disc_number: 1,
//       duration_ms: 336613,
//       explicit: false,
//       external_urls: [Object],
//       href: 'https://api.spotify.com/v1/tracks/4fbvXwMTXPWaFyaMWUm9CR',
//       id: '4fbvXwMTXPWaFyaMWUm9CR',
//       is_local: false,
//       name: 'Holocene',
//       preview_url: 'https://p.scdn.co/mp3-preview/a07bbe36e9ce8fc15114becac8876d3a20517cf2?cid=8ac881cc0bfc4bf1b8cab540c8997242',
//       track_number: 3,
//       type: 'track',
//       uri: 'spotify:track:4fbvXwMTXPWaFyaMWUm9CR'
//     },
//     {
//       artists: [Array],
//       available_markets: [Array],
//       disc_number: 1,
//       duration_ms: 188040,
//       explicit: false,
//       external_urls: [Object],
//       href: 'https://api.spotify.com/v1/tracks/5rP9Weh1uFtlyRGqnzyQnd',
//       id: '5rP9Weh1uFtlyRGqnzyQnd',
//       is_local: false,
//       name: 'Towers',
//       preview_url: 'https://p.scdn.co/mp3-preview/59c58fb5fc3a55a007a653795e72b40feab48654?cid=8ac881cc0bfc4bf1b8cab540c8997242',
//       track_number: 4,
//       type: 'track',
//       uri: 'spotify:track:5rP9Weh1uFtlyRGqnzyQnd'
//     },
//     {
//       artists: [Array],
//       available_markets: [Array],
//       disc_number: 1,
//       duration_ms: 225733,
//       explicit: false,
//       external_urls: [Object],
//       href: 'https://api.spotify.com/v1/tracks/0oirMI8pqPHJiJFTX1LhKh',
//       id: '0oirMI8pqPHJiJFTX1LhKh',
//       is_local: false,
//       name: 'Michicant',
//       preview_url: 'https://p.scdn.co/mp3-preview/7b0845003a7b8f7bedea77812ecad68e4297a692?cid=8ac881cc0bfc4bf1b8cab540c8997242',
//       track_number: 5,
//       type: 'track',
//       uri: 'spotify:track:0oirMI8pqPHJiJFTX1LhKh'
//     },
//     {
//       artists: [Array],
//       available_markets: [Array],
//       disc_number: 1,
//       duration_ms: 165013,
//       explicit: false,
//       external_urls: [Object],
//       href: 'https://api.spotify.com/v1/tracks/5kiZpF6a7kxZLurZVSewtw',
//       id: '5kiZpF6a7kxZLurZVSewtw',
//       is_local: false,
//       name: 'Hinnom, TX',
//       preview_url: 'https://p.scdn.co/mp3-preview/0685fa5674ec7cae5bd6506d08f2b8b8cb0479cb?cid=8ac881cc0bfc4bf1b8cab540c8997242',
//       track_number: 6,
//       type: 'track',
//       uri: 'spotify:track:5kiZpF6a7kxZLurZVSewtw'
//     },
//     {
//       artists: [Array],
//       available_markets: [Array],
//       disc_number: 1,
//       duration_ms: 298586,
//       explicit: false,
//       external_urls: [Object],
//       href: 'https://api.spotify.com/v1/tracks/3g9mw4A8vdljOKgwrit88g',
//       id: '3g9mw4A8vdljOKgwrit88g',
//       is_local: false,
//       name: 'Wash.',
//       preview_url: 'https://p.scdn.co/mp3-preview/a7b3bf5a54122a25ef0893c79957568f2f638399?cid=8ac881cc0bfc4bf1b8cab540c8997242',
//       track_number: 7,
//       type: 'track',
//       uri: 'spotify:track:3g9mw4A8vdljOKgwrit88g'
//     },
//     {
//       artists: [Array],
//       available_markets: [Array],
//       disc_number: 1,
//       duration_ms: 250200,
//       explicit: false,
//       external_urls: [Object],
//       href: 'https://api.spotify.com/v1/tracks/4lGb7vjGqK8OZhXRozj0Go',
//       id: '4lGb7vjGqK8OZhXRozj0Go',
//       is_local: false,
//       name: 'Calgary',
//       preview_url: 'https://p.scdn.co/mp3-preview/e931ddd0a4d920d4f8f2bed9550fa4ea9be8b8c2?cid=8ac881cc0bfc4bf1b8cab540c8997242',
//       track_number: 8,
//       type: 'track',
//       uri: 'spotify:track:4lGb7vjGqK8OZhXRozj0Go'
//     },
//     {
//       artists: [Array],
//       available_markets: [Array],
//       disc_number: 1,
//       duration_ms: 93360,
//       explicit: false,
//       external_urls: [Object],
//       href: 'https://api.spotify.com/v1/tracks/159ld20LzWoNcdk5HmPjjW',
//       id: '159ld20LzWoNcdk5HmPjjW',
//       is_local: false,
//       name: 'Lisbon, OH',
//       preview_url: 'https://p.scdn.co/mp3-preview/bea7262ff656b02cf60fd58377aea3198e3ad8ce?cid=8ac881cc0bfc4bf1b8cab540c8997242',
//       track_number: 9,
//       type: 'track',
//       uri: 'spotify:track:159ld20LzWoNcdk5HmPjjW'
//     },
//     {
//       artists: [Array],
//       available_markets: [Array],
//       disc_number: 1,
//       duration_ms: 316800,
//       explicit: false,
//       external_urls: [Object],
//       href: 'https://api.spotify.com/v1/tracks/6UI6aabe8NSRgTVySHn6CP',
//       id: '6UI6aabe8NSRgTVySHn6CP',
//       is_local: false,
//       name: 'Beth/Rest',
//       preview_url: 'https://p.scdn.co/mp3-preview/b1c472f3d54cc67624bdc39c3bb09b8ecd7d0aa0?cid=8ac881cc0bfc4bf1b8cab540c8997242',
//       track_number: 10,
//       type: 'track',
//       uri: 'spotify:track:6UI6aabe8NSRgTVySHn6CP'
//     }
//   ],
//   limit: 20,
//   next: null,
//   offset: 0,
//   previous: null,
//   total: 10