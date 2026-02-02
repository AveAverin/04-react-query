import axios from "axios";
import type { Movie } from "../types/movie";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface MoviesResponse {
    results: Movie[];
}

export async function fetchMovies(query: string): Promise<Movie[]> {
    const response = await axios.get<MoviesResponse>("/search/movie", {
        params: {
            query,
            include_adult: false,
            language: "en-US",
        },
        headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
        },
    });

    return response.data.results;
}