import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './nav.css'
import NavFirstLine from "./NavFirstLine"
import NavShow from "./NavShow"
import NavSecondLine from "./NavSecondLine"


export function Nav() {
    return (
        <div id='nav_bar'>
            <div className="row nav__line">
                <NavFirstLine />
                <NavShow />
            </div>

            <hr className="nav__hr"/>

            <NavSecondLine />

            <hr className="second_nav__hr"/>
        </div>
    )
}