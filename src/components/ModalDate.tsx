import { Description, Dialog, DialogPanel, Transition, TransitionChild, DialogTitle } from '@headlessui/react'
import { useState, useEffect } from 'react'
import useShein from '../hook/useShein'
import { ContextProps } from '../types'
import type { Date } from '../types'


export default function ModalDate() {
    const {state,dispatch,dateModal,setDateModal, colorTheme} = useShein() as ContextProps
    const [date,setDate]=useState<Date>({
      date: "",
      id:0,
      color: state.date.length,
    })
    
    useEffect(()=>{
      if (state.activeId) {
          const currentRecord = state.date.filter(i=> i.id === state.activeId)[0]//el [0] lo convierte a objeto y ya puede setearse
          
          setDate({
              date: currentRecord?.date,
              id:currentRecord?.id,
              color: currentRecord?.color,
          })
      }
  },[state.activeId])


    const formatearFecha=(date: Date['date'])=>{
      const fechaNueva=new Date(date)
      const options: Intl.DateTimeFormatOptions={
          year:'numeric',
          month:'long',
          day:'numeric',
      }
      
      const w = fechaNueva.getUTCDate()
      const x= fechaNueva.getUTCMonth()+1
      const y= fechaNueva.getUTCFullYear()
      const f=`${x}/${w}/${y}`
      const e=new Date(f)
      return e.toLocaleDateString('es-MX',options)
  }

  const handleOnChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    
    setDate({
      ...date,
      id:Date.now(),
      [e.target.id]:formatearFecha(e.target.value),
  })
  }

  const handleSubmit =(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault();
    setDateModal(false)


    if (date.date==null){
        alert("ingresa una fecha valida");
    }else{
        

    dispatch({type: 'save-date', payload: {newDate: date}})

    closeModal()

    }
}

  const closeModal =()=>{
    setDateModal(false)
    
    dispatch({type: 'set-activeId', payload: {id: 0}})

    setDate({
      date: "",
      id:0,
      color: state.date.length,
    })
  }

    return (
      <div className='text-center'>
        <button className= {` ${colorTheme === 1 && "bg-pink-500" || colorTheme===2 && "bg-purple-500" } rounded-md animate-pulse shadow-md cursor-pointer text-white font-bold p-2 hover:scale-125 duration-200`} onClick={() => setDateModal(true)}>NUEVO PEDIDO</button>
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
          <div className="fixed inset-0 -top-40 flex w-screen bg-black/70 items-center justify-center p-4">
            <DialogPanel className="max-w-lg lg:w-3/6 space-y-4  border bg-white p-12 shadow-2xl">
              <DialogTitle className={` ${colorTheme === 1 && "text-pink-500" || colorTheme === 2 && "text-purple-500"} font-bold  text-2xl`}>FECHA DEL PEDIDO</DialogTitle>
              <Description className={"text-sm lg:text-xl capitalize "}>Agrega la fecha del pedido</Description>
              <div>
                <input className='border-2 border-rose-300 w-full  lg:p-2' type="date" name="date" id="date" 
                onChange={handleOnChange}
                />
              </div>
              <div className="flex gap-4">
                <button className='bg-slate-300 p-2 rounded-md cursor-pointer lg:text-2xl' onClick={closeModal}>Cancel</button>
                <button className={` ${colorTheme === 1 && "bg-pink-500" || colorTheme === 2 && "bg-purple-500"} p-2 text-white rounded-md cursor-pointer lg:text-2xl`} onClick={ handleSubmit}>Crear Pedido</button>
              </div>
            </DialogPanel>
          </div>
          </TransitionChild>
        </Dialog>
        </Transition>
      </div>
    )
}
