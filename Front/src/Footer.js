import React from 'react';

const Footer = () => {
    return (
        <div>
            <div className="footer">
                <h1></h1>
            </div>
            <style jsx>{`
                .footer {
                    position: fixed;
                    top: 0;
                    height: 55px;
                    width: 100%;
                    background-color: whitesmoke;
                    padding: 0px;
                    margin-left: 250px;
                    border-bottom: thin solid rgb(207, 207, 207);

                }
            `}</style>
        </div>
    );
};


export default Footer;