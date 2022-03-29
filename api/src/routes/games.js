//requires

const express = require('express');
const router = express.Router();
const axios = require ('axios');
const { Videogame, Genre } = require('../db.js');
const { Op } = require('sequelize');

//consts
const getApiInfo = async () => {
    try{
        let gameOnScreen1 = await axios.get('https://api.rawg.io/api/games?key=98aed70e428041379e58bc213d3cf709')
        let gameOnScreen2 = await axios.get('https://api.rawg.io/api/games?key=98aed70e428041379e58bc213d3cf709&page2')
        let gameOnScreen3 = await axios.get('https://api.rawg.io/api/games?key=98aed70e428041379e58bc213d3cf709&page3')
        let gameOnScreen4 = await axios.get('https://api.rawg.io/api/games?key=98aed70e428041379e58bc213d3cf709&page4')
        let gameOnScreen5 = await axios.get('https://api.rawg.io/api/games?key=98aed70e428041379e58bc213d3cf709&page5')

        let games = gameOnScreen1.data.results.concat(gameOnScreen2.data.results).concat(gameOnScreen3.data.results).concat(gameOnScreen4.data.results).concat(gameOnScreen5.data.results)
        
        let game = games 

        game = game.map((result) =>{

            return {
                id: result.id,
                name: result.name,
                description: result.description,
                released: result.released,
                image: result.background_image,
                rating: result.rating,
                platforms: result.platforms.map(e => e.platform.name),
                genres: result.genres.map(e=> e.name)
            }
        })
        let arrayGames = [];

        for (let i = 0; i < 100; i++){
            arrayGames.push(game[i]);
        }
        return arrayGames;
    }catch(error){
        console.log(error);
    }
};
const infoDB = async () =>{
    const db = await Videogame.findAll({
        include:{ 
            model: Genre,
            attributes: ['name'],
            through:{
                attributes: []
            }
        }
    });
    return db;
};



module.exports = router;