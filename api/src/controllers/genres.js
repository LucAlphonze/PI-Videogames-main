const { Genre } = require("../db");
const axios = require("axios");
// const {API_KEY}=process.env;

const getGenres = async () => {
  try {
    const genresApi = await axios.get(
      `https://api.rawg.io/api/genres?key=98aed70e428041379e58bc213d3cf709}`
    );
    const genresTotal = genresApi.data.results?.map((e) => e.name);
    genresTotal.forEach((e) => {
      Genre.findOrCreate({
        where: { name: e },
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getGenres;