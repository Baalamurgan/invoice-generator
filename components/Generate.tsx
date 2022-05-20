import { useRouter } from 'next/router'
import React, { useState } from 'react'
import useInvoice from '../store/store'

const Generate = () => {
  const router = useRouter()
  const GenerateInvoice = useInvoice(state => state.generateInvoice)
  const count = useInvoice(state => state.count)
  const [name, setName] = useState("")

  return (
    <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
      <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter Name' className='rounded-xl pl-5 border mr-5' size={40} />
      <span>
        <div className="rounded-md shadow">
          <a
            onClick={() => {
              GenerateInvoice(name)
              router.push(`/invoice/${count + 1}/edit`)
            }}
            href="#"
            className="text-white bg-primary hover:bg-secondary active:bg-tertiary rounded-xl w-full flex items-center justify-center px-8 py-3 border-transparent font-medium md:py-4 md:text-lg md:px-10"
          >
            Generate Invoice
          </a>
        </div>
      </span>
    </div>
  )
}

export default Generate