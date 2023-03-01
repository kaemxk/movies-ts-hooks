export interface IMovie {
  title: string
  overview: string
  vote_average: number
  poster_path: string
  id: number
  release_date: string
  genre_ids: number[]

  [x: string]: any
}
