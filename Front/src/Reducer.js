export const initialState = {
    user: null,
    raw_data: {},
    library_list: {},
    albums: {},
    artist : null,
    player: false,
    isAlbumList :false,
    selected_album: null
};

const reducer = (state, action) => {

    switch(action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }

        case 'SET_RAW_DATA':
            return {
                ...state,
                raw_data: action.raw_data
            }

        case 'SET_LIBRARY_LIST':
            return {
                ...state,
                library_list: action.library_list
            }

        case 'SET_ALBUMS':
            return {
                ...state,
                albums: action.albums
            }

        case 'SET_ARTIST':
            return {
                ...state,
                artist: action.artist
            }

        case 'SET_ALBUM_LIST':
            return {
                ...state,
                artist: action.isAlbumList
            }

        case 'SET_SELECTED_ALBUM':
            return {
                ...state,
                artist: action.selected_album
            }


        default:
            return state;
        }
        
}

export default reducer;