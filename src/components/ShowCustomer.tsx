import { Link } from "react-router-dom"
import { Customer } from "../types"
import useShein from "../hook/useShein"
import { ContextProps } from "../types"
import {  useMemo } from "react"
import Fade from "react-reveal/Fade"

type ShowCustomerProps = {
  customer : Customer
}

export default function ShowCustomer({customer} : ShowCustomerProps) {
  const {setIdCustomer,deubt, colorTheme} = useShein() as ContextProps

  const deubtFilterId = useMemo(()=> deubt.map(i => i.idCustomer),[deubt])
  const includesDeubt = useMemo(()=> deubtFilterId.includes(customer.id),[deubt])

  return (
      <Fade right>
      <div className="flex flex-col cursor-pointer  items-center mx-auto w-full lg:w-3/4">
          <Link to="/products" className={` ${colorTheme === 1 && " text-fuchsia-500" || colorTheme===2 && "text-violet-500" } bg-white uppercase rounded-md relative font-bold text-lg lg:text-xl my-2 w-full p-2 lg:p-3 shadow-md text-center focus:bg-fuchsia-300 hover:bg-fuchsia-300 duration-200`}
          onClick={()=>setIdCustomer(customer.id)}>
            <p className={` p-1 rounded-md bg-red-400 text-white font-bold text-xs shadow-md animate-pulse ${includesDeubt ? "absolute -top-2 left-0" : "hidden"}`}>Aún Debe</p>
          {customer.name}
          </Link>
      </div>
      </Fade>
  )
}
