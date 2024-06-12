import { Description, Dialog, DialogPanel, Transition, TransitionChild, DialogTitle } from '@headlessui/react'
import { ContextProps } from "../types"
import useShein from "../hook/useShein"
import type { Product} from "../types"
import { useState, useEffect } from 'react'

export default function ModalProduct() {
    const {state,dispatch,dateModal,setDateModal,idCustomer,idFecha, colorTheme} = useShein() as ContextProps
    const [product,setProduct]=useState<Product>({
        id:0,
        idCustomer: idCustomer,
        idFecha:idFecha,
        productName: "",
        price:0
    })

    useEffect(()=>{
      if (state.activeIdProduct) {
          const currentRecord = state.product.filter(i=> i.id === state.activeIdProduct)[0]//el [0] lo convierte a objeto y ya puede setearse
          
          setProduct({
              id:currentRecord?.id,
              idCustomer: currentRecord?.idCustomer,
              idFecha: currentRecord?.idFecha,
              productName: currentRecord?.productName,
              price: currentRecord?.price
          })
      }
  },[state.activeIdProduct])

  
  

  const handleOnChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    if (e.target.type=='number') {
      setProduct({
        ...product,
        id:Date.now(),
        [e.target.id]:Number(e.target.value),
    })
    }else{
      setProduct({
        ...product,
        id:Date.now(),
        [e.target.id]:e.target.value,
    })
    }
    
    return
    
    
  }

  const handleSubmit =(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault();

    if (product.productName==null || product.price==0){
        alert("faltan campos por llenar");
    }else{
        

    dispatch({type: 'save-product', payload: {newProduct: product}})

    closeModal()
    
    }
  }

  const closeModal =()=>{
    setDateModal(false)
    
    dispatch({type: 'set-activeIdProduct', payload: {id: 0}})

    setProduct({
        id:0,
        idCustomer: idCustomer,
        idFecha: idFecha,
        productName: "",
        price:0
    })
  }


    return (
      <div className='text-center '>
        <button className={` ${colorTheme === 1 && "bg-pink-500" || colorTheme===2 && "bg-purple-500" } rounded-md animate-pulse text-sm cursor-pointer shadow-md text-white font-bold p-2 hover:scale-125 duration-200`} onClick={() => setDateModal(true)}>NUEVO PRODUCTO</button>
        <Transition appear show={dateModal}>
        <Dialog as="div" onClose={closeModal} className="relative z-50">
          <TransitionChild
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 transform-[scale(95%)]"
                  enterTo="opacity-100 transform-[scale(100%)]"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 transform-[scale(100%)]"
                  leaveTo="opacity-0 transform-[scale(95%)]"
                >
          <div className="fixed inset-0 -top-40 flex w-screen bg-black/50 items-center justify-center p-">
            <DialogPanel className=" max-w-lg lg:w-3/6  space-y-4 border bg-white p-12 shadow-2xl">
              <DialogTitle className={` ${colorTheme === 1 && "text-pink-500" || colorTheme === 2 && "text-purple-500"} font-bold  text-2xl`}>NUEVO PRODUCTO</DialogTitle>
              <Description  className={"text-sm lg:text-xl capitalize "}>Agrega un producto</Description>
              <div>
                <input className='border-2 border-rose-300 w-full lg:p-2' type="text" name="productName" id="productName" placeholder='product'
                value={product.productName}
                onChange={handleOnChange}
                />
              </div>
              <div>
                <input className='border-2 border-rose-300 w-full lg:p-2' type="number" name="price" id="price" placeholder='precio'
                value={product.price}
                onChange={handleOnChange}
                />
              </div>
              <div className="flex gap-4">
                <button className='bg-slate-300 p-2 rounded-md cursor-pointer lg:text-2xl' onClick={closeModal}>Cancel</button>
                <button className={` ${colorTheme === 1 && "bg-pink-500" || colorTheme === 2 && "bg-purple-500"} p-2 text-white rounded-md cursor-pointer lg:text-2xl`} onClick={ handleSubmit}>Añadir Producto</button>
              </div>
            </DialogPanel>
          </div>
          </TransitionChild>
        </Dialog>
      </Transition>
      </div>
    )
}
