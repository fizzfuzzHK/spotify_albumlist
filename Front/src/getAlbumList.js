import axios from "axios";

const saveJSON = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));


const getAlbumList = async() => {
    const response = await axios.get(`http://localhost:8888/getalbum`)
    const data = response.data;     
    let tmp = {}
    for(let i in data.items) {

        let artist = data.items[i].album.artists[0].name
        let artist_id = data.items[i].album.artists[0].id
        if (!tmp.hasOwnProperty(artist_id)){
            tmp[artist_id] = {
                id: artist_id,
                artistName : artist,
                albums : [{
                    id: data.items[i].album.id,
                    albumName : data.items[i].album.name,
                    image: data.items[i].album.images[1].url,
                    tracks: data.items[i].album.tracks,
                    year: data.items[i].album.release_date
                }]
            }
        }
        else {
            let length = tmp[artist_id]["albums"].length                     
            tmp[artist_id]["albums"][length] = {
                    id: data.items[i].album.id,
                    albumName : data.items[i].album.name,
                    image: data.items[i].album.images[1].url,
                    tracks: data.items[i].album.tracks,
                    year: data.items[i].album.release_date
            }
        }
    }       
    console.log(tmp);
    
    saveJSON('data', tmp)
    return tmp;
        
}

export default getAlbumList;

