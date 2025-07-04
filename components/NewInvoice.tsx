import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import useInvoice, { useHasHydrated } from '../store/store';
import Dropdown from './Dropdown';
import InvoiceGenerator from './InvoiceGenerator'

export interface Products {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    image: string;
    rating: Rating;
}

export interface SelectedProducts {
    id: number;
    title: string;
    price: number;
    quantity: number;
    description: string;
    category: Category;
    image: string;
    rating: Rating;
}

export enum Category {
    Electronics = "electronics",
    Jewelery = "jewelery",
    MenSClothing = "men's clothing",
}

export interface Rating {
    rate: number;
    count: number;
}

const NewInvoice = () => {

    const hasHydrated = useHasHydrated()
    const router = useRouter();
    const { invoiceId } = router.query;
    const { data } = useQuery<Products[]>("products", () => fetch("https://fakestoreapi.com/products").then(res => res.json()))
    const [selectedProducts, setSelectedProduct] = useState<SelectedProducts[]>([]);
    const AddProduct = useInvoice(state => state.addProduct)
    const handleClick = (event: any) => {
        if (data) {
            const selectedProduct = data.find(product => product.id === event.value)
            if (selectedProduct) {
                const newProducts = [...selectedProducts, {
                    ...selectedProduct,
                    quantity: 1,
                }]
                setSelectedProduct(newProducts)
                AddProduct(newProducts)
            }
        }
    }
    const onChangeQuantity = (id: number, quantity: number) => {
        if (selectedProducts) {
            const newSelectedProducts = selectedProducts.map(product => {
                if (id === product.id) {
                    return { ...product, quantity: quantity }
                }
                return product
            })
            setSelectedProduct(newSelectedProducts)
            AddProduct(newSelectedProducts)
        }
    }

    const findInvoiceById = useInvoice(state => state.findInvoiceById)
    const unsaveInvoice = useInvoice(state => state.unsaveInvoice)
    const editInvoice = useInvoice(state => state.editInvoice)
    const changeTransactionName = useInvoice(state => state.changeTransactionName)

    useEffect(() => {
        findInvoiceById(Number(invoiceId))
        setSelectedProduct(unsaveInvoice.products)
    }, [invoiceId])
    return (
        <InvoiceGenerator>
            <div className='grid grid-cols-2 px-5 mt-5'>
                <div className='grid grid-rows-2'>
                    <input value={unsaveInvoice.transaction_name} onChange={(e) => changeTransactionName(e.target.value)} type="text" placeholder='Enter Transaction Name' className='rounded-lg font-bold pl-5 py-2 border mr-5' size={40} />
                    <div className='text-md pl-5 mt-2'>
                        Paid on {hasHydrated && moment(unsaveInvoice.transaction_date).format('MM/DD/YYYY')}
                    </div>
                </div>
                <div className='grid grid-rows-2 justify-end'>
                    <div className='text-lg font-bold flex items-center'>
                        Amount Paid
                    </div>
                    <div className='color-primary text-xl font-bold'>
                        ${hasHydrated && editInvoice.products.reduce((prev, current) => (current.price * current.quantity) + prev, 0).toFixed(2)}
                    </div>
                </div>
            </div>
            <div style={{ border: "2px solid #ACA5D6", minHeight: '200px' }} className='rounded-lg m-3 p-3 mt-5 grid'>
                <table>
                    <thead>
                        <tr className='color-primary text-md font-bold text-left border-b-primary border-b-2'>
                            <th>Description</th>
                            <th className='text-center'>Rate</th>
                            <th className='text-center'>Qty</th>
                            <th className='text-center'>Line Total</th>
                        </tr>

                    </thead>
                    <tbody className='text-sm font-bold text-center'>
                        {selectedProducts?.map((product, i) => (
                            <tr key={i} className="tableRow">
                                <td style={{ textAlign: 'left' }}>
                                    {product.title}
                                </td>
                                <td className='px-1'>
                                    {product.price}
                                </td>
                                <td className='px-1'>
                                    <input min={1} onChange={(e) => onChangeQuantity(product.id, Number(e.target.value))} type="number" placeholder='Enter Quantity' value={product.quantity} className='rounded-lg font-bold pl-5 pr-2 py-2 border w-20' size={1} />
                                </td>
                                <td className='pr-1'>
                                    {product.price * product.quantity}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Dropdown
                    noOptionsMessage={() => <div>Loading...</div>}
                    onChange={handleClick}
                    options={data && data?.map(product => ({ value: product.id, label: product.title })).filter(product => {
                        for (let selectedProduct of selectedProducts) {
                            if (selectedProduct.id === product.value) {
                                return false
                            }
                        }
                        return true
                    })}
                    placeholder="Add Product"
                    key={selectedProducts[0] ? selectedProducts[0].id : 0}
                />
            </div>
            <div className='grid grid-cols-3 mt-5 text-right font-bold text-md pr-5'>
                <div className='col-span-2'>Total</div>
                <div>${hasHydrated && selectedProducts.reduce((prev, current) => (current.price * current.quantity) + prev, 0).toFixed(2)}</div>
            </div>
        </InvoiceGenerator>
    )
}

export default NewInvoice