import React from "react";
import {Link} from 'react-router-dom';
import SearchBar from "./SearchBar"
import "../components/css/Nav.css"
export default function Nav() {
    
    return <div className="cont">
        <div className="nav">
            <Link to = '/'>
                <button className="button">Landing page</button>
            </Link>
            <SearchBar/>
        </div>

    </div>
}