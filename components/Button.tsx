import classNames from 'classnames'
import React from 'react'

const Button = ({ children, variant, ...props }) => {
    return (
        <button
            className={classNames(
                "hover:bg-light w-full font-bold rounded-lg flex items-center justify-end px-4 py-2"
                ,
                {
                    "text-bg-light bg-primary hover:bg-secondary active:bg-tertiary justify-center": variant === "primary",
                    "color-primary bg-light text-md": variant === "secondary",
                    "color-primary bg-g-white": variant === "tertiary"
                }
            )}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button