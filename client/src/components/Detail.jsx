import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail, vaciarDetail } from "../actions";
import "../components/css/Detail.css"

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
    return function () {
      dispatch(vaciarDetail());
    };
  }, [dispatch, id]);

  const myVideogame = useSelector((state) => state.detail);

  return (
    <div className="Fondo-Detail">
      {myVideogame ? (
        <div className="Conte-General">
          <h1 className="TituloDetail">{myVideogame.name}</h1>
          <img className="ImagenDetail" src={myVideogame.image} alt="" />

          <div className="Conte-Sub">
            <h4 className="detailTitle"> Rating: {myVideogame.rating}</h4>
        
            <h4 className="detailTitle">
               Release Date: {myVideogame.released}
            </h4>
        
            <h4 className="detailTitle">
               Platforms: {myVideogame.platforms?.join(",  ")}
            </h4>

            <h4 className="detailTitle">
               Genres: {myVideogame.genres?.join(",  ")}
            </h4>
        
            <h4 className="detailTitle"> Description: </h4>
            <p
              className="Detail-Description"
              dangerouslySetInnerHTML={{ __html: myVideogame.description }}
            />
          </div>
          <Link to="/home">
            <button className="button">Back</button>
          </Link>
        </div>
      ) : (
        console.log("nada")
      )}
    </div>
  );
}