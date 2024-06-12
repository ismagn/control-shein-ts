import type { Date } from "../types";
import type { Customer } from "../types"
import type { Product } from "../types"
import type { Advance } from "../types";


export type DateActions = 
    {type: 'save-date', payload: {newDate : Date} } |
    {type: 'set-activeId', payload: {id : Date['id']} } |
    {type: 'delete-date', payload: {id : Date['id']} } |
    
    {type: 'save-customer', payload: {newCustomer : Customer}} |
    {type: 'set-activeIdCustomer', payload: {id: Customer['id']}} |
    {type: 'delete-customer' , payload: {id : Customer['id']}} |

    {type: 'save-product', payload: {newProduct : Product}} |
    {type: 'set-activeIdProduct', payload: {id: Product['id']}} |
    {type: 'delete-product' , payload: {id : Product['id']}} |
    
    {type: 'save-advance',payload: {newAdvance : Advance}} |
    {type: 'delete-advance',payload: {id : Advance['id']}} 

export type DateState = {
    date: Date[]
    activeId: Date['id']

    customer: Customer[]
    activeIdCustomer: Customer['id']

    product: Product[]
    activeIdProduct:Product['id']

    advance: Advance[]
}


//agrega el local storage al valor inicial
const localStorageDate =()=> {
    const date = localStorage.getItem('date')
    return date ? JSON.parse(date) : []
}
const localStorageCustomer =()=> {
    const Customer = localStorage.getItem('customer')
    return Customer ? JSON.parse(Customer) : []
}
const localStorageProduct =()=> {
    const Product = localStorage.getItem('product')
    return Product ? JSON.parse(Product) : []
}
const localStorageAdvance =()=> {
    const Advance = localStorage.getItem('advance')
    return Advance ? JSON.parse(Advance) : []
}

export const initialState : DateState = {
    date:localStorageDate(),
    activeId: 0,

    customer:localStorageCustomer(),
    activeIdCustomer: 0,

    product:localStorageProduct(),
    activeIdProduct:0,

    advance:localStorageAdvance()
}


export const dateReducer = (state:DateState=initialState,action:DateActions) => {
    //dates
    if (action.type === 'save-date') {

        let updateDate:Date[] = [];

        if (state.activeId) {
            updateDate = state.date.map(i=>i.id === state.activeId ? action.payload.newDate : i)
        }else{
            updateDate=[...state.date, action.payload.newDate]
        }

        //aqui se añade los valores del state al state del reducer
        return {
            ...state,
            date: updateDate,
            activeId: 0
        }
        
    }

    if (action.type === 'set-activeId') {
        return {
            ...state,
            activeId:  action.payload.id
        }
    }

    if (action.type === 'delete-date') {
        
        const res = confirm('Seguro que quieres borrar este pedido con todos sus datos?')
        if (res) {
            
            return {
                ...state,
                date: state.date.filter(i=> i.id !== action.payload.id),
                customer: state.customer.filter(i=> i.idFecha !== action.payload.id),
                product: state.product.filter(i=> i.idFecha !== action.payload.id),
                advance: state.advance.filter(i=> i.idFecha !== action.payload.id)
            }
        }
    }
    //costumer
    if (action.type === 'save-customer') {
        

        let updateCustomer:Customer[] = [];

        if (state.activeIdCustomer) {
            updateCustomer = state.customer.map(i=>i.id === state.activeIdCustomer? action.payload.newCustomer : i)
        }else{
            updateCustomer=[...state.customer, action.payload.newCustomer]
        }

        //aqui se añade los valores del state al state del reducer
        return {
            ...state,
            customer: updateCustomer,
            activeIdCustomer: 0
        }
        
    }

    if (action.type === 'set-activeIdCustomer') {
        return {
            ...state,
            activeIdCustomer:  action.payload.id
        }
    }

    if (action.type === 'delete-customer') {
        const res = confirm('Seguro que quieres borrar este cliente?')
        if (res) {
            return {
                ...state,
                customer: state.customer.filter(i=> i.id !== action.payload.id),
                product: state.product.filter(i => i.idCustomer !== action.payload.id),
                advance: state.advance.filter(i=>i.idCustomer !== action.payload.id)
            }
        }
    }
    //product
    if (action.type === 'save-product') {

        let updateProduct:Product[] = [];

        if (state.activeIdProduct) {
            updateProduct = state.product.map(i=>i.id === state.activeIdProduct? action.payload.newProduct : i)
        }else{
            updateProduct=[...state.product, action.payload.newProduct]
        }

        //aqui se añade los valores del state al state del reducer
        return {
            ...state,
            product: updateProduct,
            activeIdProduct: 0
        }
        
    }

    if (action.type === 'set-activeIdProduct') {
        
        return {
            ...state,
            activeIdProduct:  action.payload.id
        }
    }

    if (action.type === 'delete-product') {
        const res = confirm('Seguro que quieres borrar este produto?')
        if (res) {
            return {
                ...state,
                product: state.product.filter(i=> i.id !== action.payload.id)
            }
        }
    }

    if (action.type === 'save-advance') {

        return {
            ...state,
            advance: [...state.advance, action.payload.newAdvance]
        }
        
    }

    if (action.type === 'delete-advance') {
        const res = confirm('Seguro que quieres borrar este anticipo?')
        if (res) {
            return {
                ...state,
                advance: state.advance.filter(i=> i.idCustomer !== action.payload.id)
            }
        }
    }
    
    return state
}