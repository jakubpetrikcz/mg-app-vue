import axios from "axios";
const apiUrl = "https://api.themoviedb.org/3";
const apiKey = "b6099557b06d992c34b3851b02a36032";

export const getTrendingList = () => {
  return axios
    .get(`${apiUrl}/trending/movie/day?api_key=${apiKey}&language=en-US`)
    .then((response) => {
      //   console.log(response);
      return response.data;
    });
};

export const getTopRatedList = () => {
  return axios
    .get(`${apiUrl}/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`)
    .then((response) => {
      //   console.log(response);
      return response.data;
    });
};
