import React from 'react'
import './App.css'
import NavbarApp from './Nav'
import SlideArea from './SlideArea'

function App() {
    return (
        <div className="wrapper">
            <NavbarApp />
            <div className="main-block">
                <div className="sidebar"></div>
                <SlideArea />
            </div>
        </div>
    );
}

export default App;
