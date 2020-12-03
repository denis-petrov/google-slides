import React from 'react'
import './App.css'
import NavbarApp from './nav/Nav'
import SlideArea from './slideArea/SlideArea'
import SlideMenu from './slideMenu/SlideMenu'
import SlideShowPanel from './slideShowPanel/SlideShowPanel'


function App() {
    return (
        <div className="wrapper">
            <NavbarApp/>
            <div className="main-block">
                <SlideMenu/>
                <SlideArea/>
                <SlideShowPanel/>
            </div>
        </div>
    )
}

export default App;
