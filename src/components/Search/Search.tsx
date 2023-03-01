import { useEffect, useState } from 'react'
import { Input } from 'antd'
import './Search.css'

interface ISearchProps {
  value?: string
  onChange: (text: string) => void
}

const Search = ({ onChange, value }: ISearchProps) => {
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
