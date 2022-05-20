import moment from 'moment';
import { useEffect } from 'react';
import useInvoice, { useHasHydrated } from '../store/store';
import InvoiceGenerator from './InvoiceGenerator'

const InvoiceDisplay = ({ invoiceId }: { invoiceId: number }) => {
    const hasHydrated = useHasHydrated()
    const findInvoiceById = useInvoice(state => state.findInvoiceById)
    useEffect(() => {
        findInvoiceById(Number(invoiceId))
    }, [invoiceId])

    const editInvoice = useInvoice(state => state?.editInvoice)

    return (
        <InvoiceGenerator>
            <div className='grid grid-cols-2 px-5 mt-5'>
                <div className='grid grid-rows-2 pl-5'>
                    <div className='text-lg font-bold'>
                        {hasHydrated && editInvoice.transaction_name}
                    </div>
                    <div className='text-sm'>
                        Paid on {hasHydrated && moment(editInvoice.transaction_date).format('MM/DD/YYYY')}
                    </div>
                </div>
                <div className='grid grid-rows-2 justify-end mr-5 text-left'>
                    <div className='text-lg font-bold'>
                        Amount Paid
                    </div>
                    <div className='color-primary text-lg font-bold'>
                        ${hasHydrated && editInvoice.products.reduce((prev, current) => (current.price * current.quantity) + prev, 0).toFixed(2)}
                    </div>
                </div>
            </div>
            <div style={{ border: "2px solid #ACA5D6", minHeight: '200px' }} className='rounded-lg m-3 p-3 mt-5 grid'>
                <table>
                    <thead>
                        <tr className='color-primary text-md font-bold text-left'>
                            <th>Description</th>
                            <th className='text-center'>Rate</th>
                            <th className='text-center'>Qty</th>
                            <th className='text-center'>Line Total</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm font-bold text-center'>
                        {hasHydrated && editInvoice.products.map(product => {
                            return (
                                <tr key={product.id} className="tableRow">
                                    <td style={{ maxWidth: '300px', textAlign: 'left' }}>{product.title}</td>
                                    <td>${product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>${product.quantity * product.price}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className='grid grid-cols-3 mt-5 text-right font-bold text-md pr-5 pb-5'>
                <div className='col-span-2'>Total</div>
                <div>
                    ${hasHydrated && editInvoice.products.reduce((prev, current) => (current.price * current.quantity) + prev, 0).toFixed(2)}
                </div>
            </div>
        </InvoiceGenerator>
    )
}

export default InvoiceDisplay