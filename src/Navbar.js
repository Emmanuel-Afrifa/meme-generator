import React from "react";
import trollFace from "./images/Troll Face.png";

export default function Navbar(){
    return (
        <nav className="navbar">
            <p className="header-title">
                <img src={trollFace} alt="" className="header-logo"/>
                <span className="header-name">Meme Generator</span>
            </p>
            {/* <p className="header-additional">React Course - Project 3</p> */}
        </nav>
    )
}