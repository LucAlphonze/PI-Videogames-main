import React from "react";
import { Link } from "react-router-dom";
import "../components/css/LandingPage.css"
// import loadingLanding from "../components/css/Landing-gif.gif"
export default function LandingPage() {
  return (
    <div className="Background-landingPage">
      <div className="title-landingPage">
      <h1>[The Videogame Project]</h1>
      </div>
      {/* <img src={loadingLanding} className="loading" alt="please wait"></img> */}
      <div className="starto">
      <Link to="/home">
        <button className="Button">S T A R T</button>
      </Link>
      </div>
    </div>
  );
}