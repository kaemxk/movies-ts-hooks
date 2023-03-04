import './MovieCard.css'
import { Typography } from 'antd'

import { IMovie } from '../../types/types'
import MovieService from '../../services/MovieService'
import { borderColors } from '../../variables/vars'

import MovieCardMobile from './MovieCardMobile'
import MovieCardDesktop from './MovieCardDesktop'

const { Paragraph } = Typography

const MovieCard = ({
  title,
  overview,
  vote_average,
  poster_path,
  release_date,
  width,
  genre_ids,
  id,
  rating,
}: IMovie) => {
  let borderColor = '#000'
  if (vote_average <= 3) {
    borderColor = borderColors.Red
  } else if (vote_average <= 5) {
    borderColor = borderColors.Orange
  } else if (vote_average <= 7) {
    borderColor = borderColors.Yellow
  } else {
    borderColor = borderColors.Green
  }

  const cutDescription = (description: string) => {
    if (description.length < 1) return <Paragraph>No description :(</Paragraph>
    return description.split(' ').length > 31 ? description.split(' ').slice(0, 30).join(' ') + '...' : description
  }

  const rateChangeHandler = (value: number) => {
    new MovieService().rateMovie(value, id)
  }

  const Content = () => {
    if (width >= 1200) {
      return (
        <MovieCardDesktop
          title={title}
          overview={overview}
          vote_average={vote_average}
          poster_path={poster_path}
          release_date={release_date}
          genre_ids={genre_ids}
          rating={rating}
          borderColor={borderColor}
          cutDescription={cutDescription}
          rateChangeHandler={rateChangeHandler}
        />
      )
    } else {
      return (
        <MovieCardMobile
          title={title}
          overview={overview}
          vote_average={vote_average}
          poster_path={poster_path}
          release_date={release_date}
          genre_ids={genre_ids}
          rating={rating}
          borderColor={borderColor}
          cutDescription={cutDescription}
          rateChangeHandler={rateChangeHandler}
        />
      )
    }
  }

  return <Content />
}

export default MovieCard
