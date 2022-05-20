import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <div className='h-16 w-full px-10 py-5 shadow-lg'>
            <div className="flex items-center justify-between">
                <Link href="/">
                    <a>
                        <Image src="/logo.png" width={16} height={16} alt="Invoice generator logo" />
                        <span className="color-primary inline text-xl pl-1">Invoice Generator</span>
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default Navbar