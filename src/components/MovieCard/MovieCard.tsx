import React, { useContext } from 'react'
import './MovieCard.css'
import { Col, Rate, Row, Image, Typography, Button } from 'antd'
import { format } from 'date-fns'

import { IMovie } from '../../types/types'
import { MyContext } from '../Context/Context'
import MovieService from '../../services/MovieService'
import { borderColors } from '../../variables/vars'

const { Title, Paragraph } = Typography

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

  const Desktop = () => {
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
          <Rate count={10} onChange={rateChangeHandler} defaultValue={rating} />
        </Col>
      </Row>
    )
  }

  const Mobile = () => {
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

  const Content = () => {
    if (width >= 1200) {
      return <Desktop />
    } else {
      return <Mobile />
    }
  }

  return <Content />
}

interface IGenre {
  id: number
  name: string
}

const Genres = ({ arr }: { arr: number[] }) => {
  const genresList: IGenre[] = useContext(MyContext)
  const newArr: string[] = []
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < genresList.length; j++) {
      if (arr[i] === genresList[j].id) {
        newArr.push(genresList[j].name)
      }
    }
  }

  return (
    <React.Fragment>
      {newArr.map((i: string) => {
        return (
          <Button size="small" key={i}>
            {i}
          </Button>
        )
      })}
    </React.Fragment>
  )
}

export default MovieCard
