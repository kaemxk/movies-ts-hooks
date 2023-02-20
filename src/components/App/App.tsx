import React, { useEffect, useMemo, useState } from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'

import './App.css'
import Search from '../Search/Search'
import MovieList from '../MovieList/MovieList'
import MovieService from '../../services/MovieService'
import { MyContext } from '../Context/Context'

const SearchChildren = () => {
  const [value, setValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const onSearchChangeHandler = (value: string) => {
    setValue(value)
    setIsLoading(true)
  }

  return (
    <React.Fragment>
      <Search onChange={onSearchChangeHandler} />
      <MovieList query={value} loading={isLoading} rated={false} />
    </React.Fragment>
  )
}

const RatedChildren = () => {
  const [isLoading, setIsLoading] = useState(false)

  return <MovieList loading={isLoading} rated={true} />
}

const App = () => {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    new MovieService().createGuestSession().then((res) => {
      localStorage.setItem('session', res.guest_session_id)
    })
  }, [])

  useMemo(() => {
    new MovieService()
      .getGenres()
      .then((res) => res.result)
      .then((res) => {
        setGenres(res)
      })
  }, [])

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Search',
      children: <SearchChildren />,
    },
    {
      key: '2',
      label: 'Rated',
      children: <RatedChildren />,
    },
  ]

  return (
    <div className="wrapper">
      <MyContext.Provider value={genres}>
        <Tabs defaultActiveKey="1" items={items} centered={true} destroyInactiveTabPane={true} />
      </MyContext.Provider>
    </div>
  )
}

export default App
