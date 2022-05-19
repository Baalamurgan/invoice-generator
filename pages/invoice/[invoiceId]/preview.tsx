import React from 'react'
import { useRouter } from 'next/router'
import { PencilIcon, EyeIcon } from '@heroicons/react/outline'
import InvoiceDisplay from '../../../components/InvoiceDisplay'
import Button from '../../../components/Button'
import Navbar from '../../../components/Navbar'
import Link from 'next/link'
import IconButton from '../../../components/IconButton'
import { InvoiceTitle } from './edit'
import useInvoice from '../../../store/store'

const InvoicePage = () => {
  const router = useRouter();
  const { invoiceId } = router.query;
  const UpdateInvoice = useInvoice(state => state.updateInvoice)

  return (
    <div className='mx-auto'>
      <Navbar />
      <div className='px-10'>
        {/* // your side */}
        <div className='grid grid-cols-3 justify-center my-5'>
          <div>
            <InvoiceTitle />
          </div>
          <div className='grid grid-cols-2 justify-self-center gap-5 text-lg'>
            <IconButton title="Preview" Icon={EyeIcon} selected={true} />
            <div className='font-bold cursor-pointer'>
              <Link href={`/invoice/${invoiceId}/edit`}>
                <a>
                  <IconButton title="Edit" Icon={PencilIcon} selected={false} />
                </a>
              </Link>
            </div>
          </div>
          <div className='grid grid-cols-2 justify-self-center gap-5'>
      

            <Button variant="secondary">
              Export as PDF
            </Button>
            <Button variant="secondary"
              onClick={() => {
                UpdateInvoice(true)
                router.push(`/`)
              }}
            >
              Save Invoice
            </Button>
          </div>
        </div>
      </div>
      <div >
        <InvoiceDisplay invoiceId={Number(invoiceId)} />
      </div>
    </div>
  )
}

export default InvoicePage