const { Router } = require("express");
const { Videogame, Genre } = require("../db");
const { validate: uuidValidate } = require("uuid");
const axios = require("axios");
const { API_KEY } = process.env;

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!uuidValidate(id)) {
      const videogameId = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      const videogameInfo = {
        id: videogameId.data.id,
        name: videogameId.data.name,
        image: videogameId.data.background_image,
        description: videogameId.data.description,
        genres: videogameId.data.genres?.map((e) => e.name),
        released: videogameId.data.released,
        rating: videogameId.data.rating,
        platforms: videogameId.data.parent_platforms?.map(
          (e) => e.platform.name
        ),
      };
      videogameInfo
        ? res.status(200).send(videogameInfo)
        : res.status(404).send("No existe el ID ingresado!!");
    } else {
      const videogameDb = await Videogame.findByPk(id, {
        include: Genre,
      });
      const videogameIdDb = {
        id: videogameDb.id,
        name: videogameDb.name,
        image: videogameDb.image,
        genres: videogameDb.genres?.map((e) => e.name),
        description: videogameDb.description,
        released: videogameDb.released,
        rating: videogameDb.rating,
        platforms: videogameDb.platforms,
        createdInDb: videogameDb.createdInDb,
      };
      videogameIdDb
        ? res.status(200).send(videogameIdDb)
        : res.status(404).send("No existe el ID ingresado!!");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      image,
      description,
      released,
      rating,
      genres,
      platforms,
      createdInDb,
    } = req.body;

    const videogameCreated = await Videogame.create({
      name,
      image:
        image ||
        "https://www.trecebits.com/wp-content/uploads/2019/04/11854.jpg",
      description,
      released,
      rating,
      platforms,
      createdInDb,
    });

    const genresDb = await Genre.findAll({
      where: { name: genres },
    });

    videogameCreated.addGenre(genresDb);
    res.status(200).send("Videojuego creado con exito!!");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;