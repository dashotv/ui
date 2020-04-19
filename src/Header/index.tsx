import React from 'react';
import logo from './logo-small.png'
import './index.css';

function Header() {
    return (
        <header className="App-header">
            <div className="ui top fixed menu">
                <div className="item">
                    <img src={logo} alt={"logo"}/>
                </div>
                <a href="/" className="item">Home</a>
                <a href="/media" className="item">Media</a>
                <a href="/releases" className="item">Releases</a>
            </div>
        </header>
    );
}

export default Header;
