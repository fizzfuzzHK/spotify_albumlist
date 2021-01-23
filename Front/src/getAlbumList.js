import axios from "axios";

const getAlbumList = async() => {
    const response = await axios.get(`http://localhost:8888/getalbum`)
    const data = response.data; 
    console.log('getalbumlist');
    
    let tmp = {}
    for(let i in data.items) {

        let artist = data.items[i].album.artists[0].name
        if (!tmp.hasOwnProperty(artist)){
            tmp[artist] = [{
                id: data.items[i].album.id,
                album : data.items[i].album.name,
                image: data.items[i].album.images[1].url,
                // tracks: data.items[i].album.tracks,
                year: data.items[i].album.release_date
            }]
        }
        else {
            let length = tmp[artist].length                     
            tmp[artist][length] = {
                id: data.items[i].album.id,
                album : data.items[i].album.name,
                image: data.items[i].album.images[1].url,
                // tracks: data.items[i].album.tracks,
                year: data.items[i].album.release_date
            }
        }
    }       

    return tmp;
        
}

export default getAlbumList;