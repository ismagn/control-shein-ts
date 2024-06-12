import { Description, Dialog, DialogPanel, Transition, TransitionChild, DialogTitle } from '@headlessui/react'
import { Advance, ContextProps } from "../types"
import useShein from "../hook/useShein"
import { useState } from 'react'

export default function ModalAdvance() {
    const {dispatch,advanceModal,setAdvanceModal, idCustomer, idFecha, colorTheme} = useShein() as ContextProps

    
    const [advance,setAdvance]=useState<Advance>({
      id:0,
      idCustomer: idCustomer,
      idFecha: idFecha,
      amount:0
    })

  const handleOnChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    
    setAdvance({
      ...advance,
      id:Date.now(),
      amount:Number(e.target.value),
  })
  }

  const handleSubmit =(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault();
    setAdvanceModal(false)


    if (advance.amount==null){
        alert("ingresa una valor valido");
    }else{
        

    dispatch({type: 'save-advance', payload: {newAdvance: advance}})

    }
}


    return (
      <div className='text-center'>
        <button className={` ${colorTheme === 1 && "bg-pink-500" || colorTheme === 2 && "bg-purple-500"} text-white shadow-md text-sm font-bold p-2 rounded-md hover:scale-105 duration-200`} onClick={() => setAdvanceModal(true)}>AÑADIR ANTICIPO</button>
        <Transition appear show={advanceModal}>
        <Dialog as="div" onClose={() => setAdvanceModal(false)} className="relative z-50">
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
              <DialogTitle className={` ${colorTheme === 1 && "text-pink-500" || colorTheme === 2 && "text-purple-500"} font-bold  text-2xl`}>NUEVO ANTICIPO</DialogTitle>
              <Description  className={"text-sm lg:text-xl capitalize "}>Agrega un anticipo para este cliente</Description>
              <div>
                <input className='border-2 border-rose-300 w-full lg:p-2' type="number" name="advance" id="advance" placeholder='cantidad'
                onChange={handleOnChange}
                />
              </div>
              <div className="flex gap-4">
                <button className='bg-slate-300 p-2 rounded-md cursor-pointer lg:text-2xl' onClick={() => setAdvanceModal(false)}>Cancel</button>
                <button className={` ${colorTheme === 1 && "bg-pink-500" || colorTheme === 2 && "bg-purple-500"} p-2 text-white rounded-md cursor-pointer lg:text-2xl`} onClick={ handleSubmit}>Agregar Anticipo</button>
              </div>
            </DialogPanel>
          </div>
          </TransitionChild>
        </Dialog>
      </Transition>
      </div>
    )
}
