import { useContext } from 'react'
import SearchContext from '../../context/SearchContext'
import { Link } from 'react-router-dom'

const SearchItem = () => {
  const [values] = useContext(SearchContext)
  return (
    <div>
      <h1>Search Results</h1>
      <h6>
        {values.results.length < 1 ? "No Products Found" : `Found ${values.results.length}`}
      </h6>
      <div className='p-4 px-10 flex w-5/6 flex-row flex-wrap gap-7 justify-center'>
            {
              values.results.map((item)=>{
                return(
                  <div key={item._id} className=" w-84 shadow-sm">
                    <Link to={"singleproduct"}>
                      <div className='flex justify-center'>
                        <img
                          src={`/api/v1/product/product-photo/${item._id}`} className='h-60 w-auto flex justify-center items-center '
                          alt={item.name} />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-3xl font-semibold tracking-wide">{item.name}</h2>
                        <p className='text-gray-800'>{item.description}</p>
                        <h1 className='text-gray-800'>{item.price}</h1>
                        <div className="card-actions justify-end px-6 p-2">
                          <button className=" flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-orange-600 text-gray-50">Buy Now</button>
                        </div>
                      </div>
                    </Link>
                    
                  </div>
                )
              })
            }
        
          </div>
    </div>
  )
}

export default SearchItem