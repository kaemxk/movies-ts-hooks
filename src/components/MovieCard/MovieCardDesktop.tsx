import { Col, Image, Rate, Row, Typography } from 'antd'
import { format } from 'date-fns'

import Genres from '../Genres/Genres'
import { IMovieCardProps } from '../../types/types'

const { Title, Paragraph } = Typography

const MovieCardDesktop = ({
  id,
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
  let rate
  if (localStorage.getItem('rated') !== null) {
    const rated = JSON.parse(localStorage.getItem('rated')!)
    rate = rated[id]
  } else {
    rate = rating
  }

  return (
    <Row wrap={false} justify={'start'}>
      <Col style={{ maxHeight: '281px', maxWidth: '183px' }}>
        {poster_path ? (
          <Image width={183} height="281px" src={'https://image.tmdb.org/t/p/original' + poster_path} />
        ) : (
          <h2 style={{ height: '281px', width: '183px', textAlign: 'center' }}>No img</h2>
        )}
      </Col>
      <Col style={{ padding: '15px 20px', position: 'relative' }}>
        <div className="rating" style={{ border: `1px solid ${borderColor}` }}>
          <span>{vote_average.toFixed(1)}</span>
        </div>
        <Title className="title" level={5}>
          {title}
        </Title>
        {release_date ? (
          <Paragraph>{format(new Date(release_date), 'MMMM d, y')}</Paragraph>
        ) : (
          <Paragraph>Invalid date value</Paragraph>
        )}
        <Genres arr={genre_ids} />
        <Paragraph style={{ marginTop: '10px' }}>{cutDescription(overview)}</Paragraph>
        <Rate count={10} onChange={rateChangeHandler} defaultValue={rate} />
      </Col>
    </Row>
  )
}

export default MovieCardDesktop
