import { DateState, DateActions } from "../reducers/date-reducer"

export type Date = {
    id: number
    color:number
    date: string
}
export type Customer = {
    id: number
    idFecha:number
    name: string
}
export type Product = {
    id: number
    idCustomer:number
    idFecha: number
    productName: string
    price: number
}

export type Advance = {
    id:number
    idCustomer: number
    idFecha: number
    amount:number
}

export type DeubtItem = {
    idCustomer: number
    remaining: number
}

export type ContextProps = {
    state: DateState
    dispatch: React.Dispatch<DateActions>
    dateModal:boolean
    setDateModal:React.Dispatch<React.SetStateAction<boolean>>
    advanceModal:boolean
    setAdvanceModal:React.Dispatch<React.SetStateAction<boolean>>
    setIdFecha:React.Dispatch<React.SetStateAction<number>>
    idFecha: number
    idCustomer: number
    setIdCustomer: React.Dispatch<React.SetStateAction<number>>
    totalCustomers: number
    totalProducts: number
    totalRemaining: number
    totalOrder: number
    setDeubt: React.Dispatch<React.SetStateAction<DeubtItem[]>>
    deubt: DeubtItem[]
    setColorTheme: React.Dispatch<React.SetStateAction<number>>
    colorTheme: number
}



