import React from 'react'

const Button = ({buttonText}) => {
  return (
    <button className='bg-amber-400 hover:bg-amber-500 px-2 py-1 rounded-md text-base mb-0.5'>
        {buttonText}
    </button>
  )
}

export default Button