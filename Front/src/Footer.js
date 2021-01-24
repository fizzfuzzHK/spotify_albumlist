import React from 'react';

const Footer = () => {
    return (
        <div>
            <div className="footer">
                <h1>Footer</h1>
            </div>
            <style jsx>{`
                .footer {
                    position: fixed;
                    bottom: 0;
                    height: 65px;
                    width: 100%;
                    background-color: #282828;
                    padding: 20px;
                }
            `}</style>
        </div>
    );
};


export default Footer;