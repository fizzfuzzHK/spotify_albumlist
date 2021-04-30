import axios from "axios";

const getAlbumList = async() => {
    const response = await axios.get(`http://localhost:8888/getalbum`)
    const data = response.data; 
    console.log('getalbumlist' + JSON.stringify(data,null,2));
    
    let tmp = {}
    for(let i in data.items) {

        let artist = data.items[i].album.artists[0].name
        let artist_id = data.items[i].album.artists[0].id
        if (!tmp.hasOwnProperty(artist_id)){
            tmp[artist_id] = {
                id: artist_id,
                name : artist,
                album : [{
                    id: data.items[i].album.id,
                    name : data.items[i].album.name,
                    image: data.items[i].album.images[1].url,
                    tracks: data.items[i].album.tracks,
                    year: data.items[i].album.release_date
                }]
            }
        }
        else {
            let length = tmp[artist_id]["album"].length                     
            tmp[artist_id]["album"][length] = {
                    id: data.items[i].album.id,
                    name : data.items[i].album.name,
                    image: data.items[i].album.images[1].url,
                    tracks: data.items[i].album.tracks,
                    year: data.items[i].album.release_date
            }
        }
    }       

    return tmp;
        
}

export default getAlbumList;

