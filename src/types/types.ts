export interface IMovie {
  title: string
  overview: string
  vote_average: number
  poster_path: string
  id: number
  release_date: string
  genre_ids: number[]
  width: number
  rating: number
}

export interface IMovieCardProps {
  title: string
  overview: string
  vote_average: number
  poster_path: string
  release_date: string
  genre_ids: number[]
  rating: number
  borderColor: string
  cutDescription: (description: string) => string | JSX.Element
  rateChangeHandler: (value: number) => void
}
