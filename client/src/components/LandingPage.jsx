import React from "react";
import { Link } from "react-router-dom";
import "../components/css/LandingPage.css"
// import loadingLanding from "../components/css/Landing-gif.gif"
export default function LandingPage() {
  return (
    <div >
      <div className="Background-landingPage">
      <h1 className="title-landingPage">[The Videogame Project]</h1>
      </div>
      {/* <img src={loadingLanding} className="loading" alt="please wait"></img> */}
      <Link to="/home">
        <button className="Button">S T A R T</button>
      </Link>
    </div>
  );
}