import { useEffect, useState } from 'react';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { SelectedProducts } from '../components/NewInvoice';

interface InvoiceType {
    id: number,
    invoice_name: string;
    transation_name: string;
    transation_date: Date;
    products: SelectedProducts[];
    amount: number;
}

interface InvoicesType {
    count: number,
    isEdit: boolean,
    Invoice: InvoiceType[];
    editInvoice: InvoiceType;
    unsaveInvoice: InvoiceType;
    generateInvoice: (name: string) => void
    addProduct: (products: SelectedProducts[]) => void
    changeTransactionName: (name: string) => void
    changeInvoiceName: (name: string) => void
    findInvoiceById: (id: number) => void
    updateInvoice: (isEdited: boolean) => void
    updateEditInvoice: () => void
    unedit: () => void
}



const useInvoice = create(
    persist<InvoicesType>(
        (set, get) => ({
            isEdit: false,
            count: 0,
            Invoice: [],
            editInvoice: {
                id: 0,
                invoice_name: '',
                transation_date: new Date(),
                transation_name: '',
                products: [],
                amount: 0,
            },
            unsaveInvoice: {
                id: 0,
                invoice_name: '',
                transation_name: '',
                transation_date: new Date(),
                products: [],
                amount: 0,
            },
            changeTransactionName: (name) => set((state) => (
                {
                    unsaveInvoice: {
                        ...state.unsaveInvoice,
                        transation_name: name
                    }
                }
            )),
            changeInvoiceName: (name) => set((state) => (
                {
                    editInvoice: {
                        ...state.editInvoice,
                        invoice_name: name
                    }
                }
            )),
            unedit: () => {
                set(() => ({
                    isEdit: false
                }))
            },
            findInvoiceById: (id: number) => {
                const invoice = get().Invoice.find(invoice => invoice.id === id)
                if (!get().isEdit) {
                    set(() => ({ editInvoice: invoice, unsaveInvoice: invoice, isEdit: true }))
                }
            },
            updateEditInvoice: () => {
                set((state) => ({
                    editInvoice: state.unsaveInvoice
                }))
            },
            updateInvoice: (isEdited) => {
                let getEditInvoice = get().unsaveInvoice
                if (isEdited) {
                    getEditInvoice = get().editInvoice
                }
                const Invoices = get().Invoice
                const UpdatedInvoice = Invoices.map(invoice => {
                    if (invoice.id === getEditInvoice.id) {
                        return getEditInvoice
                    }
                    return invoice
                })
                set(() => ({ Invoice: UpdatedInvoice }))
            },
            generateInvoice: (name: string) => set(state => ({
                count: state.count + 1,
                Invoice: [...state.Invoice, {
                    id: state.count + 1,
                    amount: 0,
                    invoice_name: name,
                    products: [],
                    transation_name: "Transation " + (state.count + 1),
                    transation_date: new Date(),
                }]
            })),
            addProduct: (products) =>
                set((state) => ({
                    unsaveInvoice: {
                        ...state.unsaveInvoice,
                        products: products,
                    },
                })),
        }),
        { name: "invoice" }
    ),
);

export const useHasHydrated = () => {
    const [hasHydrated, setHasHydrated] = useState<boolean>(false);

    useEffect(() => {
        setHasHydrated(true);
    }, []);

    return hasHydrated;
};

export default useInvoice;
