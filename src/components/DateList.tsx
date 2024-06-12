
import useShein from "../hook/useShein"
import { ContextProps } from "../types";
import ModalDate from "./ModalDate"
import { Link } from "react-router-dom";
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
  } from 'react-swipeable-list';
  import 'react-swipeable-list/dist/styles.css';
  import type { Date } from "../types";
  import Fade from "react-reveal/Fade"


export default function DateList() {

    const {state, dispatch,setIdFecha,setDateModal,colorTheme} = useShein() as ContextProps
    
    
    const leadingActions=(id : Date['id'])=>(
        <LeadingActions>
            <SwipeAction onClick={()=>editDate(id)}>
                EDITAR
            </SwipeAction>
        </LeadingActions>
    )
    const trailingActions=(id : Date['id'])=>(
        <TrailingActions>
            <SwipeAction onClick={()=>deleteDate(id)}>
                ELIMINAR
            </SwipeAction>
        </TrailingActions>
    )

    const editDate =(id : Date['id'])=>{
        dispatch({type: 'set-activeId', payload: {id: id}})
        setDateModal(true)
    }
    const deleteDate =(id : Date['id'])=>{
        dispatch({type: 'delete-date', payload: {id: id}})
    }

  return (
    <Fade>
    <div className="">
        <div className={` ${colorTheme === 1 && "text-pink-500" || colorTheme===2 && "text-purple-500" }my-5 `}>
            <h1 className={` ${colorTheme === 1 && "text-pink-500" || colorTheme===2 && "text-purple-500" } text-center my-5 text-2xl lg:text-4xl font-bold`}>PEDIDOS</h1>
            <p className={` ${colorTheme === 1 && "text-pink-500" || colorTheme===2 && "text-purple-500" } text-center my-3 text-xs lg:text-md animate-pulse`}>-- Desliza para Editar o Eliminar --</p>
        </div>
        <div className="w-5/6 mx-auto my-5  max-h-96  overflow-y-auto ">
            {state?.date.map(date => (
            <div key={date.id}>
            <SwipeableList>
                <SwipeableListItem
                leadingActions={leadingActions(date.id)}
                trailingActions={trailingActions(date.id)}
                >
                <Fade left>
                <div key={date.id} className="flex flex-col cursor-pointer  items-center mx-auto w-full ">
                    <Link to={`/customers`} className={` ${colorTheme === 1 && " text-fuchsia-500" || colorTheme===2 && "text-violet-500" } bg-white rounded-md relative  font-bold text-lg lg:text-xl my-2 w-full p-3 shadow-md text-center focus:bg-fuchsia-300 hover:bg-fuchsia-300 duration-200`}
                    onClick={()=>setIdFecha(date.id)}
                    >{date.date}</Link>
                    <p className={`absolute top-4 p-1 left-1 ${date.color==0 && " bg-purple-300" || date.color==1 && "bg-pink-300" || date.color==2 && "bg-green-300" || date.color==3 && "bg-indigo-300" || date.color==4 && "bg-yellow-300" || date.color==5 && " bg-orange-300" || date.color==6 && "bg-blue-400" || date.color==7 && " bg-red-300" || date.color==8 && " bg-lime-300"  || date.color==9 && " bg-cyan-400" || date.color==10 && "bg-pink-300" || date.color==11 && " bg-slate-300" || date.color==12 && " bg-violet-400" || date.color==13 && "bg-pink-500" || date.color==14 && " bg-indigo-500" }`}>.</p>
                </div>
                </Fade>
                </SwipeableListItem>
            </SwipeableList>
            </div>
            ))}
        </div>
        <div>
            <ModalDate/>
        </div>
    </div>
    </Fade>
  )
}
