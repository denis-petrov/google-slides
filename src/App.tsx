import React from 'react'
import './App.css'
import NavbarApp from './nav/Nav'
import SlideArea from './slideArea/SlideArea'
import SlideMenu from './slideMenu/SlideMenu'

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
