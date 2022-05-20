import React, { useRef } from 'react'
import { useRouter } from 'next/router'
import { PencilIcon, EyeIcon } from '@heroicons/react/outline'
import InvoiceDisplay from '../../../components/InvoiceDisplay'
import Button from '../../../components/Button'
import Navbar from '../../../components/Navbar'
import Link from 'next/link'
import IconButton from '../../../components/IconButton'
import { InvoiceTitle } from './edit'
import useInvoice from '../../../store/store'
import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";

const InvoicePage = () => {
  const router = useRouter();
  const { invoiceId } = router.query;
  const UpdateInvoice = useInvoice(state => state.updateInvoice)
  const ref = useRef<HTMLDivElement>(null);

  const generateImage = async () => {
    if (ref && ref.current) {
      const image = await toPng(ref.current, { quality: 0.95 });
      const doc = new jsPDF();
      doc.addImage(image, 'JPEG', 5, 22, 500, 300);
      doc.save("invoiceGenerator");
    }
  }

  return (
    <div className='mx-auto' >
      <Navbar />
      <div className='px-10'>
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
            <Button variant="secondary"
              onClick={generateImage}
            >
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
      <div ref={ref}>
        <InvoiceDisplay invoiceId={Number(invoiceId)} />
      </div>
    </div>
  )
}

export default InvoicePage