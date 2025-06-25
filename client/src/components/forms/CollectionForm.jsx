import React from 'react'

const CollectionForm = ({handleSubmit,value,setValue}) => {
  return (
    <div className='p-2'>
        <form onSubmit={handleSubmit} className='flex gap-4'>
            <input className='p-3 outline-none ' type="text" value={value} onChange={(e)=>{setValue(e.target.value)}} placeholder='Enter Your collection'/>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default CollectionForm