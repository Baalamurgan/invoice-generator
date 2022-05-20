import classNames from 'classnames'
import React from 'react'

const Button = ({ children, variant, ...props }: { children: React.ReactNode, variant: string, onClick: () => void }) => {
    return (
        <button
            className={classNames(
                "hover:bg-light font-bold rounded-lg flex items-center justify-end px-4 py-2"
                ,
                {
                    "text-bg-light text-white bg-primary hover:bg-secondary active:bg-tertiary justify-center": variant === "primary",
                    "color-primary bg-light text-md": variant === "secondary",
                    "color-primary bg-g-white hover:bg-light": variant === "tertiary"
                }
            )}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button