import { Description, Dialog, DialogPanel, Transition, TransitionChild, DialogTitle } from '@headlessui/react'
import { ContextProps } from "../types"
import useShein from "../hook/useShein"
import type { Customer } from "../types"
import { useState, useEffect} from 'react'

export default function ModalCustomers() {
  const {state,dispatch,dateModal,setDateModal, idFecha, colorTheme} = useShein() as ContextProps

    
    const [customer,setCustomer]=useState<Customer>({
      name: "",
      id:0,
      idFecha: idFecha,
    })

    useEffect(()=>{
      if (state.activeIdCustomer) {
          const currentRecord = state.customer.filter(i=> i.id === state.activeIdCustomer)[0]//el [0] lo convierte a objeto y ya puede setearse
          
          setCustomer({
              name: currentRecord?.name,
              id:currentRecord?.id,
              idFecha: currentRecord?.idFecha,
              
          })
      }
    
  },[state.activeIdCustomer])

  const handleOnChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    if (state.activeIdCustomer) {
      setCustomer({
        ...customer,
        [e.target.id]:e.target.value,
      })
    } else{
      setCustomer({
        ...customer,
        id:Date.now(),
        [e.target.id]:e.target.value,
      })
    } 
  }

  const handleSubmit =(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault();

    if (customer.name==null){
        alert("ingresa una nombre valido");
    }else{
        

    dispatch({type: 'save-customer', payload: {newCustomer: customer}})

    closeModal()

    }
}

  const closeModal =()=>{
    setDateModal(false)
    
    dispatch({type: 'set-activeIdCustomer', payload: {id: 0}})

    setCustomer({
      name: "",
      id:0,
      idFecha: idFecha,
    })
  }


    return (
      <div className='text-center'>
        <button className={` ${colorTheme === 1 && "bg-pink-500" || colorTheme===2 && "bg-purple-500" } rounded-md animate-pulse shadow-md cursor-pointer text-white font-bold p-2 hover:scale-125 duration-200`} onClick={() => { setDateModal(true)}}>NUEVO CLIENTE</button>
        <Transition appear show={dateModal}>
        <Dialog as='div' onClose={closeModal} className="relative z-50">
        <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
          <div className="fixed inset-0 -top-40 flex w-screen bg-black/50 items-center justify-center p-4">
            <DialogPanel className="max-w-lg lg:w-3/6 space-y-4 border bg-white p-12 shadow-2xl">
              <DialogTitle className={` ${colorTheme === 1 && "text-pink-500" || colorTheme === 2 && "text-purple-500"} font-bold  text-2xl`}>NUEVO CLIENTE</DialogTitle>
              <Description className={"text-sm lg:text-xl capitalize"}>Agrega un cliente al pedido</Description>
              <div>
                <input className='border-2 border-rose-300 w-full lg:p-2' type="text" name="name" id="name" placeholder='nombre'
                value={customer.name}
                onChange={handleOnChange}
                />
              </div>
              <div className="flex gap-4">
                <button className='bg-slate-300 p-2 rounded-md cursor-pointer lg:text-2xl' onClick={closeModal}>Cancel</button>
                <button className={` ${colorTheme === 1 && "bg-pink-500" || colorTheme === 2 && "bg-purple-500"} p-2 text-white rounded-md cursor-pointer lg:text-2xl`} onClick={ handleSubmit}>Añadir Cliente</button>
              </div>
            </DialogPanel>
          </div>
          </TransitionChild>
        </Dialog>
        </Transition>
      </div>
    )
}

