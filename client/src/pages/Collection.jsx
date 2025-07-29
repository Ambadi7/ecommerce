import React from 'react'
import useCollection from '../hooks/useCollection'

const Collection = () => {
  const collections = useCollection()
  return (
    <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <colgroup>
              <col />
              <col className="w-24" />
            </colgroup>
            <thead className="bg-gray-300">
              <tr className="text-left">
                <th className="p-3">Collection name</th>
                
              </tr>
            </thead>
            {collections.map((item)=>{
        return (
            <tbody>
              <tr className="border-b border-opacity-20 border-gray-300 bg-gray-50">
                <td className="p-3">
                  <p>{item.name}</p>
                </td>
              </tr>
              
            </tbody>
        )
      })}
            
          </table>
        </div>
  )
}

export default Collection