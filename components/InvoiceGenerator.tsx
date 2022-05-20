import Image from 'next/image'
import React from 'react'

const InvoiceGenerator = ({ children }: { children: any }) => {
    return (
        <div className="shadow-xl mx-auto mb-10 max-w-2xl rounded-b-lg" style={{ borderTop: "6px solid #7161C5" }}>
            <div className='grid grid-cols-2 bg-light px-5 py-3'>
                <div className="flex items-center justify-between">
                    <a href="#">
                        <Image src="/logo.png" width={16} height={16} alt="Invoice generator logo" />
                        <span className="color-primary inline text-xl pl-1">Invoice Generator</span>
                    </a>
                </div>
                <div className='flex flex-col align-center justify-center items-end gap-0 text-right font-bold text-sm'>
                    LegalForce RAPC Worldwide
                    <span>
                        +1 877-794-9511
                    </span>
                    <span>
                        1580 West El Camino Real, Suite 10
                    </span>
                    <span>
                        Mountain View, California
                    </span>
                    <span>
                        94040 - 2479
                    </span>
                    United States
                </div>
            </div>
            {children}
        </div>
    )
}

export default InvoiceGenerator