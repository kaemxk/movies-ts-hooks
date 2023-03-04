import React, { useContext } from 'react'
import { Button } from 'antd'

import { MyContext } from '../Context/Context'

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

export default Genres
