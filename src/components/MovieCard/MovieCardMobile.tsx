import { Image, Rate, Row, Typography } from 'antd'
import { format } from 'date-fns'

import Genres from '../Genres/Genres'
import { IMovieCardProps } from '../../types/types'

const { Title, Paragraph } = Typography

const MovieCardMobile = ({
  title,
  overview,
  vote_average,
  poster_path,
  release_date,
  genre_ids,
  rating,
  cutDescription,
  rateChangeHandler,
  borderColor,
}: IMovieCardProps) => {
  return (
    <Row wrap={false} justify={'start'} className="row">
      <div className="col">
        {poster_path ? (
          <Image width={100} src={'https://image.tmdb.org/t/p/original' + poster_path} />
        ) : (
          <h2 style={{ height: '150px', width: '100px', textAlign: 'center' }}>No img</h2>
        )}
        <div className="rating" style={{ border: `1px solid ${borderColor}` }}>
          <span>{vote_average.toFixed(1)}</span>
        </div>
        <div className="wrap">
          <Title className="title" level={5}>
            {title}
          </Title>
          {release_date ? (
            <Paragraph>{format(new Date(release_date), 'MMMM d, y')}</Paragraph>
          ) : (
            <Paragraph>Invalid date value</Paragraph>
          )}
          <Genres arr={genre_ids} />
        </div>
      </div>
      <div className="col">
        <Paragraph style={{ marginTop: '10px' }}>{cutDescription(overview)}</Paragraph>
        <Rate count={10} onChange={rateChangeHandler} defaultValue={rating} />
      </div>
    </Row>
  )
}

export default MovieCardMobile
