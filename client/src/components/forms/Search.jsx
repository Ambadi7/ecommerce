import React from 'react'
import SearchContext from '../../../context/SearchContext'
import { useContext } from 'react'
const Search = () => {
    const {value,setValue} = useContext(SearchContext)
  return (
    <>
        <form>
            <input type="text" value={value} className='h-20 border-2' />
            <button type='submit'>Search</button>
        </form>
    </>
  )
}

export default Search