import axios, { AxiosResponse} from 'axios';
import { Movie } from '../types/movie';

export interface FetchParams{
    query: string,
    page: number,
    include_adult: boolean,
    language: string
}

export interface HttpResponse {
    page: number,
    results: Movie[],
    total_pages: number,
    total_results: number
}
export async function fetchMovies({ query, page = 1, include_adult = false, language = 'en-US' }: FetchParams ): Promise<AxiosResponse <HttpResponse>> {
    const token = import.meta.env.VITE_TMDB_TOKEN 
    const response = await axios.get<HttpResponse>(`https://api.themoviedb.org/3/search/movie`, {
        params: {
            query,
            page,
            include_adult, 
            language
        } ,
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return response
}