import { useState } from 'react';
import './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { fetchMovies } from '../../services/movieService'
import { Movie } from '../../types/movie';
import { defaultFetchParams } from '../../services/tmdbDefaults';
import toast, { Toaster } from 'react-hot-toast'


export default function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const handleSearch = async (query: string) => {
    setMovies([])
    setIsLoading(true)
    setIsError(false)
    try {
      const response = await fetchMovies({query, ...defaultFetchParams})

       if(response.data.results.length === 0){
       toast('No movies found for your request.')
       return
       }

      setMovies(response.data.results)
    } catch(error) {
      setIsError(true)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

const openModal = (movie: Movie) => setSelectedMovie(movie)
const closeModal = () => setSelectedMovie(null)

  return (
    <>
    <Toaster />
    <SearchBar onSubmit={handleSearch}/>
    { isLoading && <Loader/> }
    { isError ? <ErrorMessage/> : <MovieGrid movies={movies} onSelect={openModal}/> }
    { selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal}/>}
    </>
  )
}
