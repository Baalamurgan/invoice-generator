import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React, { useState } from 'react'
import Button from './Button'
import InvoiceDisplay from './InvoiceDisplay'

const InvoiceCard = ({ title, date, id }: { title: string, date: string, id: number }) => {
  const [ifOpened, setIfOpened] = useState(false)
  return (
    <div className='border-2 pr-10 pl-7 py-5 rounded-xl mt-5'>
      <div className='grid grid-cols-2'>
        <div className='grid grid-rows-2 '>
          <p className='text-xl font-bold'>
            <Link href={`/invoice/${id}/preview`}>
              {title}
            </Link>
          </p>
          <p className='text-sm'>
            {date}
          </p>
        </div>
        <div className='flex items-center'>
          <Button onClick={() => setIfOpened(!ifOpened)} variant="tertiary">
            View Invoice
            {ifOpened && (
              <ChevronUpIcon className="h-6 w-6" aria-hidden="true" />
            )}
            {!ifOpened && (
              <ChevronDownIcon className="h-6 w-6" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>
      <div>
        {ifOpened && (
          <InvoiceDisplay invoiceId={id} />
        )}
      </div>
    </div>
  )
}

export default InvoiceCard