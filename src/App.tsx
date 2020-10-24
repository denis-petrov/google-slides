import React from 'react'
import './App.css'
import NavbarApp from './Nav'
import SlideArea from './SlideArea'
import SlideMenu from './SlideMenu'

function App() {
    return (
        <div className="wrapper">
            <NavbarApp />
            <div className="main-block">
                <SlideMenu />
                <SlideArea />
            </div>
        </div>
    )
}

export default App;
