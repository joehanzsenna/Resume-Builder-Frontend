import React, { useEffect, useState } from 'react'

const API_KEY = 'd0c3f913'

export default function Omdb() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?s=nollywood&2025&apikey=${API_KEY}`
        )
        const data = await res.json()

        if (data.Response === 'True') {
          setMovies(data.Search)
        } else {
          setError(data.Error)
        }
      } catch (err) {
        setError('Failed to fetch movies')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  if (loading) {
    return <p className="text-center mt-10">Loading movies...</p>
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        OMDB Movies
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {movies.map(movie => (
          <div
            key={movie.imdbID}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={
                movie.Poster !== 'N/A'
                  ? movie.Poster
                  : 'https://via.placeholder.com/300x450?text=No+Image'
              }
              alt={movie.Title}
              className="w-full h-[350px] object-cover"
            />

            <div className="p-3">
              <h2 className="font-semibold text-sm truncate">
                {movie.Title}
              </h2>
              <p className="text-xs text-gray-500">
                {movie.Year}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
