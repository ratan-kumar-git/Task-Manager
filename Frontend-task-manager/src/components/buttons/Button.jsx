import React from 'react'

const Button = ({buttonText}) => {
  return (
    <button className='bg-amber-400 hover:bg-amber-500 px-3 py-2 mt-2 rounded-md text-lg'>
        {buttonText}
    </button>
  )
}

export default Button