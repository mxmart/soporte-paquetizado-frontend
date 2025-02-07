import React from 'react'

export const IsLoadingLogo = () => {
  return (
    <span className='text-white text-center flex items-center justify-center gap-x-2 text-xs'>
        <div className={`h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-4`}></div>
    </span>
  )
}
