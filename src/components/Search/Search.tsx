import React, { useEffect, useState } from 'react'
import { Input } from 'antd'
import './Search.css'

const Search = ({ onChange, value }: any) => {
  const [text, setText] = useState('')

  useEffect(() => {
    const timeOutId = setTimeout(() => onChange(text), 500)
    return () => clearTimeout(timeOutId)
  }, [text])

  return (
    <Input className="input" placeholder="Type to search..." onChange={(e) => setText(e.target.value)} value={value} />
  )
}

export default Search
