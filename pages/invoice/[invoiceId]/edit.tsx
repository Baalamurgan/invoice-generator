import React, { useState } from 'react'
import Navbar from '../../../components/Navbar'
import { useRouter } from 'next/router'
import { PencilIcon, EyeIcon, CheckIcon } from '@heroicons/react/outline'
import Button from '../../../components/Button'
import Link from 'next/link'
import NewInvoice from '../../../components/NewInvoice'
import IconButton from '../../../components/IconButton'
import useInvoice, { useHasHydrated } from '../../../store/store'

export const InvoiceTitle = () => {

  const hasHydrated = useHasHydrated()
  const invoice_name = useInvoice(state => state?.editInvoice?.invoice_name)
  const ChangeInvoiceName = useInvoice(state => state.changeInvoiceName)
  const [isEdit, setIsEdit] = useState(false)
  const [invoiceName, setInvoiceName] = useState(invoice_name)

  if (isEdit) {
    return (
      <>
        <input value={invoiceName} onChange={(e) => setInvoiceName(e.target.value)} type="text" placeholder='Enter Inoice Name' className='rounded-xl font-bold pl-2 py-1 border' />
        <CheckIcon className='inline h-6 w-6 cursor-pointer ml-1' aria-hidden="true" onClick={() => {
          setIsEdit(false)
          ChangeInvoiceName(invoiceName)
        }
        } />
      </>
    )
  }
  else {
    return <p className='font-bold'>{hasHydrated && invoice_name}
      <PencilIcon className='inline h-4 w-4 cursor-pointer ml-1' aria-hidden="true" onClick={() => setIsEdit(true)} />
    </p>
  }
}

const InvoicePage = () => {
  const router = useRouter();
  const { invoiceId } = router.query;
  const UpdateInvoice = useInvoice(state => state.updateInvoice)
  const UpdateEditInvoice = useInvoice(state => state.updateEditInvoice)
  return (
    <div className='mx-auto'>
      <Navbar />
      <div className='px-10'>
        <div className='grid grid-cols-3 justify-center my-5'>
          <div>
            <InvoiceTitle />
          </div>
          <div className='grid grid-cols-2 justify-self-center gap-5 text-lg'>
            <div className='font-bold cursor-pointer'>
              <Link href={`/invoice/${invoiceId}/preview`}>
                <a>
                  <IconButton title="Preview" Icon={EyeIcon} selected={false} />
                </a>
              </Link>
            </div>
            <IconButton title="Edit" Icon={PencilIcon} selected={true} />
          </div>
          <div className='grid grid-cols-2 justify-self-center gap-5'>
            <Button variant="primary"
              onClick={() => {
                UpdateEditInvoice()
              }}
            >
              Save Changes
            </Button>
            <Button variant="secondary"
              onClick={() => {
                UpdateInvoice(false)
                router.push(`/`)
              }}
            >
              Save Invoice
            </Button>
          </div>
        </div>
      </div>
      <NewInvoice />
    </div>
  )
}

export default InvoicePage