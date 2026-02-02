import axios from "axios";
import type { Movie } from "../types/movie";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export interface MoviesResponse {
    results: Movie[];
    total_pages: number;
}

export async function fetchMovies(query: string, page = 1): Promise<MoviesResponse> {
    const response = await axios.get<MoviesResponse>("/search/movie", {
        params: {
            query,
            page,
            include_adult: false,
            language: "en-US",
        },
        headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
        },
    });

    return response.data;
}