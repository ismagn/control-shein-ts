import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild, Description } from '@headlessui/react'
import { useState } from 'react'
import useShein from '../hook/useShein'
import { ContextProps } from '../types'

type EditMenuProps = {
    setHeaderTitle: React.Dispatch<React.SetStateAction<string>>
    setHeaderSubtitle: React.Dispatch<React.SetStateAction<string>>
    headerSubtitle: string
    headerTitle: string
}

export default function EditMenu({setHeaderTitle, setHeaderSubtitle, headerSubtitle, headerTitle} : EditMenuProps) {
    const {setColorTheme, colorTheme} = useShein() as ContextProps
    const [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  const handleOnChange=(e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)=>{
    if (e.target.id === 'title') {
        
        setHeaderTitle(e.target.value)
    }
    if (e.target.id === 'subtitle') {
        setHeaderSubtitle(e.target.value)
    }
    if (e.target.id == 'colorTheme') {
        setColorTheme(Number(e.target.value))
        
    }
    console.log(e.target);
    
  }

  return (
    <>
      <Button
        onClick={open}
        className="absolute cursor-pointer bottom-0 right-0 rounded-md bg-black/15 py-1.5 px-2 text-xs lg:text-lg font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Editar
      </Button>

      <Transition appear show={isOpen}>
      <Dialog as="div" onClose={close} className="relative z-50">
      <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
          <div className="fixed inset-0 -top-40 flex w-screen bg-black/60 items-center justify-center p-4">
            <DialogPanel className=" max-w-lg lg:max-w-2xl space-y-4 border bg-white p-10 shadow-2xl">
              <DialogTitle className={` ${colorTheme === 1 && "text-pink-500" || colorTheme === 2 && "text-purple-500"} font-bold  text-2xl lg:text-4xl`}>EDITAR ENCABEZADO Y COLOR DEL TEMA</DialogTitle>
              <Description className={"text-sm lg:text-xl capitalize"}>Edita El Titulo y color de tu App</Description>
              <div>
                <label htmlFor="title" className=' font-semibold lg:text-xl'>Nombre Negocio:</label>
                <input className='border-2 border-rose-300 w-full lg:p-2' type="text" name="title" id="title" placeholder='tiulo'
                onChange={handleOnChange}
                value={headerTitle}
                />
              </div>
              <div>
                <label htmlFor="subtitle" className=' font-semibold lg:text-xl '>Categoria:</label>
                <input className='border-2 border-rose-300 w-full lg:p-2' type="text" name="subtitle" id="subtitle" placeholder='subtitulo'
                onChange={handleOnChange}
                value={headerSubtitle}
                />
              </div>
              
                <h2 className='block font-semibold lg:text-xl'>Color del Tema: </h2>

              <div className='flex justify-start gap-8'>
                <div  className='flex gap-2'>
                    <input type="checkbox" name="colorTheme1" id="colorTheme1" className='w-5' checked={colorTheme === 1 ? true : false} onChange={()=>setColorTheme(1)}/>
                    <label htmlFor="colorTheme1">ROSA</label>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" name="colorTheme2" id="colorTheme2" className='w-5' checked={colorTheme === 2 ? true : false} onChange={()=>setColorTheme(2)}/>
                    <label htmlFor="colorTheme2">LILA</label>
                </div>
              </div>
              <div className="flex gap-4">
                <button className={` ${colorTheme === 1 && "bg-pink-500" || colorTheme === 2 && "bg-purple-500"} p-2 text-white rounded-md cursor-pointer lg:text-2xl`} onClick={()=>setIsOpen(false)} >Finalizar</button>
              </div>
            </DialogPanel>
          </div>
            </TransitionChild>
        </Dialog>
      </Transition>
    </>
  )
}