import React, { useContext } from 'react'
import SearchContext from '../../context/SearchContext'

const SearchItem = () => {
  const [values,setValues] = useContext(SearchContext)
  return (
    <div>
      <h1>Search Results</h1>
      <h6>
        {values.results.length < 1 ? "No Products Found" : `Found ${values.results.length}`}
      </h6>
    </div>
  )
}

export default SearchItem