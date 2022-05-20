import type { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Generate from '../components/Generate'
import InvoiceCard from '../components/InvoiceCard';
import useInvoice, { useHasHydrated } from '../store/store'


const Home: NextPage = () => {

  const hasHydrated = useHasHydrated()
  const Invoices = useInvoice(state => state.Invoice)
  const unedit = useInvoice(state => state.unedit)

  useEffect(() => {
    unedit()
  }, [])
  

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
              <Generate />
            </div>
            <div>
              <main className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-2xl md:text-3xl">
                    <span className="block blacky-color xl:inline">Saved Invoices</span>
                  </h1>
                </div>
                <div>
                  {
                    hasHydrated && Invoices.map(invoice => (
                      <InvoiceCard id={invoice.id} key={invoice.id} title={invoice.invoice_name} date="5th May 2021" />
                    ))
                  }
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