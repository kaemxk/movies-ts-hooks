import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Col, Pagination, Row, Spin } from 'antd'

import MovieCard from '../MovieCard/MovieCard'
import MovieService from '../../services/MovieService'
import { IMovie } from '../../types/types'
import './MovieList.css'

interface IMovieListProps {
  query?: string
  loading: boolean
  tab: string
}

interface IData {
  movies: IMovie[]
  totalPages: number
  url: string
}

const MovieList = ({ query, loading, tab }: IMovieListProps) => {
  const [movies, setMovies] = useState<IMovie[]>([])
  const [url, setUrl] = useState<string>('')
  const [totalPages, setTotalPages] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(loading)
  const [isError, setIsError] = useState(false)

  const urlHandler = (url: string) => {
    return url.split('?').slice(0, 1).join()
  }

  const doEverythingWithState = (data: IData) => {
    if (data.movies.length === 0) {
      setIsError(true)
      setIsLoading(false)
      return
    }
    setMovies(data.movies)
    setUrl(urlHandler(data.url))
    setTotalPages(data.totalPages)
    setIsLoading(false)
    setIsError(false)
  }

  const movieHandler = (query?: string) => {
    if (tab === 'Rated') {
      new MovieService().getRatedMovies().then((res) => doEverythingWithState(res))
      return
    }
    if (query !== '' && query) {
      new MovieService().searchMovie(query).then((res) => doEverythingWithState(res))
      return
    } else {
      new MovieService().getPopularMovies().then((res) => doEverythingWithState(res))
      return
    }
  }

  useEffect(() => {
    setIsLoading(loading)
    movieHandler(query)
  }, [query, loading])

  function useWindowWidth() {
    const [windowWidth, setWindowWidth] = useState(0)
    useLayoutEffect(() => {
      function updateSize() {
        setWindowWidth(window.innerWidth)
      }

      window.addEventListener('resize', updateSize)
      updateSize()
      return () => window.removeEventListener('resize', updateSize)
    }, [])
    return windowWidth
  }

  const width = useWindowWidth()

  const Content = ({ movies }: { movies: IMovie[] }) => {
    return (
      <React.Fragment>
        {movies.map(({ title, overview, vote_average, poster_path, id, release_date, genre_ids, rating }) => {
          return (
            <Col span={24} style={{ color: '#000' }} key={id} xl={12}>
              <div className="item">
                <MovieCard
                  width={width}
                  title={title}
                  overview={overview}
                  vote_average={vote_average}
                  poster_path={poster_path}
                  id={id}
                  release_date={release_date}
                  genre_ids={genre_ids}
                  rating={rating}
                />
              </div>
            </Col>
          )
        })}
      </React.Fragment>
    )
  }

  const content = !isLoading && !isError ? <Content movies={movies} /> : null
  const error = !isLoading && isError ? <h2 style={{ margin: '0 auto' }}>Ничего не найдено :(</h2> : null
  const loader = isLoading && !isError ? <Spin size={'large'} style={{ margin: '0 auto' }} /> : null

  const pageChangeHandler = (page: number) => {
    new MovieService().switchPage(url, page, query).then((res) => doEverythingWithState(res))
  }

  return (
    <React.Fragment>
      <Row gutter={[36, 36]}>
        {content}
        {error}
        {loader}
      </Row>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '35px' }}>
        <Pagination total={totalPages} onChange={pageChangeHandler} showSizeChanger={false} />
      </div>
    </React.Fragment>
  )
}

export default MovieList
