import type { NextPage } from 'next'
import Image from 'next/image'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import InvoiceDisplay from './components/InvoiceDisplay'

const Home: NextPage = () => {
  const [ifOpened, setIfOpened] = useState(false)
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
            <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
              <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <a href="#">
                    <Image src="/../public/logo.png" width={50} height={50} />
                  </a>
                </div>
              </div>
            </nav>
          </div>
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block color-primary xl:inline">Invoice Generator</span>
              </h1>
              <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
                <input type="text" placeholder='Enter Name' className='rounded-xl pl-5 border mr-5' size={40} />
                <span>
                  <div className="rounded-md shadow">
                    <a
                      href="#"
                      className="bg-primary hover:bg-secondary active:bg-tertiary rounded-xl w-full flex items-center justify-center px-8 py-3 border-transparent text-base font-medium rounded-md md:py-4 md:text-lg md:px-10"
                    >
                      Generate Invoice
                    </a>
                  </div>
                </span>
              </div>
            </div>
            <div>
              <main className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-2xl md:text-3xl">
                    <span className="block blacky-color xl:inline">Saved Invoices</span>
                  </h1>
                </div>
                <div className='border border-2 pr-10 pl-7 py-5 rounded-xl mt-5'>
                  <div className='grid grid-cols-2'>
                    <div className='grid grid-rows-2 '>
                      <div className='text-xl font-bold'>
                        Invoice 1
                      </div>
                      <div className='text-sm'>
                        5th May 2021
                      </div>
                    </div>
                    <div className='flex items-center'>
                      <a
                        href="#"
                        onClick={() => setIfOpened(!ifOpened)}
                        className="color-primary hover:bg-light rounded-full w-full flex items-center justify-end text-base font-medium px-2 py-1 md:text-lg"
                      >
                        View Invoice
                        {ifOpened && (
                          <ChevronUpIcon className="h-6 w-6" aria-hidden="true" />
                        )}
                        {!ifOpened && (
                          <ChevronDownIcon className="h-6 w-6" aria-hidden="true" />
                        )}
                      </a>
                    </div>
                  </div>
                  {ifOpened && (
                    <InvoiceDisplay></InvoiceDisplay>
                  )}
                </div>
              </main>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <Image src="/../public/invoice.png" width={600} height={600} />
      </div>
    </div>
  )
}

export default Home