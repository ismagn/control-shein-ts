import {  useNavigate } from "react-router-dom";
import ModalCustomers from "./ModalCustomers";
import useShein from "../hook/useShein";
import { ContextProps } from "../types";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import type { Customer } from "../types";
import { useMemo, useEffect} from "react";
import PanelSummary from "./PanelSummary";
import ShowCustomer from "./ShowCustomer";
import Fade from "react-reveal/Fade"



export default function Customers() {
    const navigate = useNavigate()
    const {state,dispatch,setDateModal,idFecha,colorTheme} = useShein() as ContextProps
    const customerFilter = useMemo(()=> state.customer.filter(i => i.idFecha === idFecha),[state.customer])
    
    useEffect(()=>{
      if (!idFecha) {
          navigate('/')
      }
  },[idFecha])

    const leadingActions=(id : Customer['id'])=>(
      <LeadingActions>
          <SwipeAction onClick={()=>editCustomer(id)}>
              EDITAR
          </SwipeAction>
      </LeadingActions>
  )
  const trailingActions=(id : Customer['id'])=>(
      <TrailingActions>
          <SwipeAction onClick={()=>deleteCustomer(id)}>
              ELIMINAR
          </SwipeAction>
      </TrailingActions>
  )

  const editCustomer =(id : Customer['id'])=>{
      dispatch({type: 'set-activeIdCustomer', payload: {id: id}})
      setDateModal(true)
  }
  const deleteCustomer =(id : Customer['id'])=>{
      dispatch({type: 'delete-customer', payload: {id: id}})
  }

  return (
    <Fade>
    <div className="">
      <div>
        <Fade>
          <PanelSummary/>
        </Fade>
      </div>
        <div className="w-5/6 mx-auto max-h-96 overflow-y-auto">
            <p className={` ${colorTheme === 1 && "text-pink-500" || colorTheme===2 && "text-purple-500" } text-center my-3 text-xs lg:text-md  animate-pulse`}>-- Desliza para Editar o Eliminar --</p>
            {customerFilter.map(customer => (
            <div key={customer.id}>
            <SwipeableList>
              <SwipeableListItem
              leadingActions={leadingActions(customer.id)}
              trailingActions={trailingActions(customer.id)}
              >
                <ShowCustomer
                key={customer.id}
                customer={customer}
                />
              </SwipeableListItem>
            </SwipeableList>
            </div>
            ))}
        </div>
        <div className="my-5">
            <ModalCustomers/>
        </div>
    </div>
    </Fade>
  )
}
