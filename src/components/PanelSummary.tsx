import { useMemo } from "react"
import useShein from "../hook/useShein"
import { ContextProps } from "../types"

export default function PanelSummary() {
    const {state,totalCustomers, totalRemaining, totalProducts,totalOrder,idFecha, colorTheme} = useShein() as ContextProps

    const dateFilter = useMemo(()=> state.date.filter(i => i.id === idFecha)[0],[idFecha])

  return (
    <>
    <div className="text-center  bg-white">
        <h2 className={` ${colorTheme === 1 && "text-pink-500" || colorTheme === 2 && "text-purple-500"} font-bold lg:text-lg`}>Pedido del {dateFilter?.date}</h2>
    </div>
    <div className={` ${colorTheme === 1 && "text-pink-400" || colorTheme === 2 && "text-purple-400"} w-full font-bold bg-white p-3 flex justify-around lg:justify-center gap-1 lg:gap-10 text-xs lg:text-md text-center my-1 shadow-md`}>
        <p className="border py-2 px-1">TOTAL PEDIDO: <span className={` ${colorTheme === 1 && "text-pink-600" || colorTheme === 2 && "text-purple-600"} block font-black text-md `}>{totalOrder} MXN</span></p>
        <p className="border py-2">TOTAL CLIENTES: <span className={` ${colorTheme === 1 && "text-pink-600" || colorTheme === 2 && "text-purple-600"} block font-black text-md `}>{totalCustomers} </span></p>
        <p className="border py-2">TOTAL ARTICULOS: <span className={` ${colorTheme === 1 && "text-pink-600" || colorTheme === 2 && "text-purple-600"} block font-black text-md `}>{totalProducts} </span></p>
        <p className="border py-2">TOTAL RESTANTE: <span className={` ${colorTheme === 1 && "text-pink-600" || colorTheme === 2 && "text-purple-600"} block font-black text-md `}>{totalRemaining} MXN</span></p>
    </div>
    </>
  )
}
