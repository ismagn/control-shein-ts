import { useReducer } from "react";
import { ReactNode, createContext, useEffect, useState } from "react"
import { dateReducer,initialState } from "../reducers/date-reducer";
import type { DeubtItem } from "../types";



type SheinProviderProps = {
    children: ReactNode
}

const SheinContext = createContext({});

const SheinProvider = ({children} : SheinProviderProps) => {

    const [dateModal, setDateModal] = useState(false)
    const [advanceModal, setAdvanceModal] = useState(false)
    const [idFecha,setIdFecha] = useState(0)
    const [idCustomer,setIdCustomer] = useState(0)
    const [state, dispatch] =useReducer(dateReducer,initialState)

    //sumary states global
    const [totalCustomers,setTotalCustomers] = useState(0)
    const [totalProducts,setTotalProducts] = useState(0)
    const [totalRemaining,setTotalRemaining] = useState(0)
    const [totalOrder, setTotalOrder] = useState(0)

    const [deubt,setDeubt] =useState<DeubtItem[]>([])

    //teme
    const localStorageTheme =()=> {
        const colorTheme = localStorage.getItem('colorTheme')
        return colorTheme ? JSON.parse(colorTheme) : 1
    }
    const [colorTheme, setColorTheme] = useState<number>(localStorageTheme())

    
    //total customers and product order 
    useEffect(()=>{
        const customerFilter = state.customer.filter(i => i.idFecha === idFecha)
        setTotalCustomers(customerFilter.length)

        const productFilter = state.product.filter(i => i.idFecha === idFecha)
        setTotalProducts(productFilter.length)

    },[state,idFecha])

    //total remaining and order
    useEffect(()=>{
        const advanceFilter = state.advance.filter(i=> i.idFecha === idFecha)
        const sumTotalAdvances = advanceFilter.reduce((total,i) => total+ i.amount, 0 )
        
        const productFilter = state.product.filter(i=> i.idFecha === idFecha)
        const sumTotalProducts = productFilter.reduce((total,i) => total+ i.price, 0 )
        
        setTotalOrder(sumTotalProducts)
        setTotalRemaining(sumTotalProducts-sumTotalAdvances)
        
    },[state,idFecha])

    
    
    useEffect(()=>{
        localStorage.setItem('colorTheme', JSON.stringify(colorTheme))
    },[colorTheme])

    useEffect(()=>{
        localStorage.setItem('date', JSON.stringify(state.date))
    },[state.date])
    
    useEffect(()=>{
        localStorage.setItem('customer', JSON.stringify(state.customer))
    },[state.customer])

    useEffect(()=>{
        localStorage.setItem('product', JSON.stringify(state.product))
    },[state.product])

    useEffect(()=>{
        localStorage.setItem('advance', JSON.stringify(state.advance))
    },[state.advance])




    

    return (
        <SheinContext.Provider
            value={{
                state,
                dispatch,
                dateModal,
                setDateModal,
                advanceModal,
                setAdvanceModal,
                setIdFecha,
                idFecha,
                idCustomer,
                setIdCustomer,
                totalCustomers,
                totalProducts,
                totalRemaining,
                totalOrder,
                deubt,
                setDeubt,
                colorTheme,
                setColorTheme
            }}
        >{children}</SheinContext.Provider>
    )
}

export {
    SheinProvider
}
export default SheinContext