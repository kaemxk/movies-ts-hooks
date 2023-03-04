import React, { useEffect, useMemo, useState } from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'

import './App.css'
import Search from '../Search/Search'
import MovieList from '../MovieList/MovieList'
import MovieService from '../../services/MovieService'
import { MyContext } from '../Context/Context'

interface ITabChildrenProps {
  tab: string
}

const TabChildren = ({ tab }: ITabChildrenProps) => {
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSearchChangeHandler = (value: string) => {
    setValue(value)
    setIsLoading(true)
  }

  return (
    <React.Fragment>
      {tab === 'Rated' ? null : <Search onChange={onSearchChangeHandler} />}
      <MovieList query={value} loading={isLoading} tab={tab} />
    </React.Fragment>
  )
}

const App = () => {
  const [genres, setGenres] = useState([])
  const [tab, setTab] = useState('Search')

  useEffect(() => {
    const fetchData = async () => {
      const movieService = await new MovieService().createGuestSession()
      localStorage.setItem('session', movieService.guest_session_id)
    }

    localStorage.removeItem('rated')
    fetchData()
  }, [])

  useMemo(async () => {
    const movieService = await new MovieService().getGenres()
    const res = await movieService.result
    return setGenres(res.genres)
  }, [])

  const items: TabsProps['items'] = [
    {
      key: 'Search',
      label: 'Search',
      children: <TabChildren tab={tab} />,
    },
    {
      key: 'Rated',
      label: 'Rated',
      children: <TabChildren tab={tab} />,
    },
  ]

  return (
    <div className="wrapper">
      <MyContext.Provider value={genres}>
        <Tabs
          defaultActiveKey="1"
          items={items}
          centered={true}
          destroyInactiveTabPane={true}
          onChange={(tabName) => setTab(() => tabName)}
        />
      </MyContext.Provider>
    </div>
  )
}

export default App
