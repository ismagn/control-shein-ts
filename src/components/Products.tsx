import ModalProduct from "./ModalProduct";
import { ContextProps } from "../types";
import useShein from "../hook/useShein";
import ControlPanel from "./ControlPanel";
import { useMemo } from "react";
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
  } from 'react-swipeable-list';
  import 'react-swipeable-list/dist/styles.css';
  import type { Product } from "../types";
  import Fade from "react-reveal/Fade"
  import Zoom from "react-reveal/Zoom"


export default function Products() {
    const {state,dispatch,setIdFecha,idCustomer,setDateModal, colorTheme} = useShein() as ContextProps

    const productsFilter = useMemo(()=> state.product.filter(i => i.idCustomer === idCustomer),[state.product])
    const total = useMemo(()=> productsFilter.reduce((total, i) => total + i.price, 0),[state.product])
    
    
    const leadingActions=(id : Product['id'])=>(
        <LeadingActions>
            <SwipeAction onClick={()=>editProduct(id)}>
                EDITAR
            </SwipeAction>
        </LeadingActions>
    )
    const trailingActions=(id : Product['id'])=>(
        <TrailingActions>
            <SwipeAction onClick={()=>deleteProduct(id)}>
                ELIMINAR
            </SwipeAction>
        </TrailingActions>
    )

    const editProduct =(id : Product['id'])=>{
        dispatch({type: 'set-activeIdProduct', payload: {id: id}})
        setDateModal(true)
    }
    const deleteProduct =(id : Product['id'])=>{
        dispatch({type: 'delete-product', payload: {id: id}})
    }


  return (
    <Fade>
    <div className="">
    <div className="flex flex-col relative lg:flex-row lg:justify-around p-1 lg:py-10 lg:m-5  border-violet-300 ">
        <div  className="lg:pt-8 lg:w-5/12">
            <Zoom>
            <ControlPanel
            total={total}
            />
            </Zoom>
        </div>
        <div className=" lg:absolute lg:top-0  my-3">
            <ModalProduct/>
        </div>
        <div className="lg:w-5/12 lg:pt-10 h-screen">
            <div className="text-center w-5/6 max-h-60 lg:max-h-96 overflow-y-auto  lg:w-full mx-auto ">
                <p className={` ${colorTheme === 1 && "text-pink-400" || colorTheme===2 && "text-purple-400" } text-center uppercase text-lg lg:text-2xl font-bold`}>productos: {productsFilter.length}</p>
                {productsFilter.map(product => (
                    <div key={product.id}>
                    <SwipeableList>
                        <SwipeableListItem
                        leadingActions={leadingActions(product.id)}
                        trailingActions={trailingActions(product.id)}
                        >
                        <Fade left>
                        <div key={product.id}  className="flex justify-between shadow-md rounded-md p-2 bg-white my-2 w-full cursor-pointer focus:bg-fuchsia-300 hover:bg-fuchsia-300 duration-200">
                            <p className={` ${colorTheme === 1 && " text-fuchsia-500" || colorTheme===2 && "text-violet-500" } text-lg font-bold uppercase `} 
                            onClick={()=>setIdFecha(product.idCustomer)}
                            >{product.productName}</p>
                            <p className={` ${colorTheme === 1 && "text-pink-400" || colorTheme===2 && "text-purple-400" } font-bold text-lg`}>${product.price}</p>
                        </div>
                        </Fade>
                        </SwipeableListItem>
                    </SwipeableList>
                    </div>
                ))}
            </div>
        </div>
    </div>
    </div>
    </Fade>
  )
}
