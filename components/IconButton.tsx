import React from 'react'
import classNames from 'classnames'

const IconButton = ({ Icon, title, selected}: {Icon: any, title: string, selected: boolean}) => {
  return (
    <div className='font-bold cursor-pointer text-md'>
    <div 
                className={classNames(
                    "flex gap-x-2 justify-center items-center ",
                    [ selected ? "color-primary border-b-[#7161C5] border-b-4" : "color-gray"]
                )}>
      <Icon className='inline h-5 w-5' aria-hidden="true" />
      <p>{title}</p>
    </div>
  </div>
  )
}

export default IconButton