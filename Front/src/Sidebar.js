import React from 'react';
import SidebarAlbum from "./SidebarAlbum"
import {useStateValue} from "./DataLayer"

const Sidebar = ({...props}) => {
    const [{ raw_data, library_list, isAlbumList }, dispatch] = useStateValue();
    

    return (
        <div className="sidebar">
            <div >
                <img
                    className="sidebar__logo"
                    src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
                    alt=""
                />
                <h1 className="sidebar__title">Artists</h1>
                <SidebarAlbum {...props} />
            </div>
            <style jsx>{`
                .sidebar {
                    font-family: "Meiryo", sans-serif;
                    height: 100vh;
                    width: 100%;
                    flex: 0.1;
                    
                    min-width: 230px;
                    background-color: white;
                    padding-left: 10px;
                    padding-right: 10px;
                    overflow: scroll;

                }
                .sidebar__logo {
                    margin-right: auto;
                    object-fit: contain;
                    height: 70px;
                    padding: 10px;
                }
                .sidebar__title {
                    padding: 10px;
                    font-size: 20px;

                }
                .sidebar__title h1 {
                }
            `}</style>
        </div>
    );
};

export default Sidebar;