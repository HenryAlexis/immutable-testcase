import React from "react";
import {NavLink} from "react-router-dom";

function Header()
{
    return <div id="header" className="navbar navbar-inverse">
        <div className="nav navbar-nav">
            <NavLink exact to="/immutable-casestudy.html" className="navbar-brand">Homepage</NavLink>
            <NavLink exact to="/blockchains" className="navbar-brand">Blockchains by NFT Sales Volume (24 hours)</NavLink>
            <NavLink exact to="/projects" className="navbar-brand">Comparison of Project Trading Values</NavLink>
        </div>
    </div>;
}

export default Header;