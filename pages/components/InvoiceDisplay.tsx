import type { NextPage } from 'next'
import Image from 'next/image'

const InvoiceDisplay: NextPage = () => {
    return (
        <div className="drop-shadow-2xl" style={{ borderTop: "6px solid #7161C5" }}>
            <div className='grid grid-cols-2 h-40 bg-light px-5'>
                <div className="flex items-center justify-between">
                    <a href="#">
                        <Image src="/../public/logo.png" width={16} height={16} />
                        <span className="block color-primary inline text-xl pl-1">Invoice Generator</span>
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
            <div className='grid grid-cols-2 px-5 mt-5'>
                <div className='grid grid-rows-2'>
                    <div className='text-lg font-bold'>
                        1. Transaction 1
                    </div>
                    <div className='text-sm pl-5'>
                        Paid on 05/04/2022
                    </div>
                </div>
                <div className='grid grid-rows-2 justify-end'>
                    <div className='text-lg font-bold'>
                        Amount Paid
                    </div>
                    <div className='color-primary text-lg font-bold pl-5'>
                        $1,999.00
                    </div>
                </div>
            </div>
            <div style={{ border: "2px solid #7161C5" }} className='rounded-lg p-3 mt-5 grid '>
                <table className="">
                    <thead>
                        <tr className='color-primary text-md font-bold text-left'>
                            <th>Description</th>
                            <th>Rate</th>
                            <th>Qty</th>
                            <th>Line Total</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm font-bold'>
                        <tr>
                            <td>Trademark Filing Application - USA</td>
                            <td>$8,500.00</td>
                            <td>1</td>
                            <td>$8,500.00</td>
                        </tr>
                        <tr>
                            <td>Priority Rush Processing (Next Business Day)</td>
                            <td>$89.00</td>
                            <td>1</td>
                            <td>$89.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='grid grid-cols-3 mt-5 text-right font-bold text-md pr-5'>
                <div className='col-span-2'>Total</div>
                <div>$1,999.00</div>
            </div>
        </div>
    )
}

export default InvoiceDisplay