import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ModalAdvance from './ModalAdvance';
import useShein from '../hook/useShein';
import type { ContextProps } from '../types';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';


type ControlPanelProps ={
    total: number
}

export default function ControlPanel({total} : ControlPanelProps) {

    const navigate = useNavigate()
    const {state,dispatch,idCustomer, setDeubt, deubt,dateModal, idFecha, colorTheme} =useShein() as ContextProps
    const filterAdvance = useMemo(()=> state.advance.filter(i=> i.idCustomer === idCustomer),[state.advance])
    const sumAdvanced = useMemo(()=> filterAdvance.reduce((total, i) => total + i.amount,0),[state.advance])
    const remaining = useMemo(()=> total - sumAdvanced,[state.advance,dateModal])
    const percentage = useMemo(()=> +(((total - remaining)/total)*100).toFixed(2),[state,state.product,dateModal])
    const dateFilter = useMemo(()=> state.date.filter(i => i.id === idFecha)[0],[idFecha])
    const customerFilter = useMemo(()=> state.customer.filter(i => i.id === idCustomer)[0],[idCustomer])

    

    const deleteAdvance =()=>{
        dispatch({type: 'delete-advance', payload: {id: idCustomer}})
    }
    
    useEffect(()=>{
        if (!idCustomer) {
            navigate('/')
        }
    },[idCustomer])

    useEffect(()=>{
            const objDeubt = {
                idCustomer: idCustomer,
                remaining:remaining
            }
    
            const filterId = deubt.map(i=> i.idCustomer)
            const includesIdCustomer = filterId.includes(idCustomer)
            
            if (includesIdCustomer) {
                const updateDeubt = deubt.map(i => i.idCustomer === idCustomer ? objDeubt : i)
                const isGreaterFilter = updateDeubt.filter(i => i.remaining > 0)
                setDeubt(isGreaterFilter)
            }else {
                if (remaining > 0 ) {
                    
                    setDeubt([...deubt,objDeubt])
                }
            }
    },[remaining,state,idCustomer])

  return (
    <div className="bg-white p-4 shadow-lg rounded-md ">
            <div className={` ${colorTheme === 1 && "text-rose-300" || colorTheme === 2 && " text-violet-300"} flex justify-between text-xs lg:text-lg uppercase  font-bold border-b-2 border-fuchsia-400`}>
                <p>Pedido del {dateFilter?.date}</p>
                <p>{customerFilter?.name}</p>
            </div>
        <div className="flex justify-between md:justify-center p-4 gap-2 lg:gap-6  ">
            <div className='  w-3/6 md:w-2/6 lg:w-3/6  '>
            <CircularProgressbar
                value={percentage}
                text={`${percentage >= 100 ? "liquidado" : "Abonado:  %"+percentage} `}
                counterClockwise={true}
                circleRatio={1}
                styles={{
                    path:{
                        stroke: percentage >= 100 ? 'rgb(35, 150, 10)' :'rgb(214, 123, 250)',
                    },
                    text:{
                        fill: percentage >= 100 ? 'rgb(35, 150, 0)' :'rgb(214, 123, 250)',
                        fontSize: '8px',
                        fontWeight: 'boldder'
                    },

                }}
            />

            </div>
            <div className='  w-4/6 md:w-2/6 flex flex-col items-center justify-center'>
                <div className=' py-5 px-2 font-bold text-sm lg:text-md'>
                    <p className={` ${colorTheme === 1 && "text-pink-300" || colorTheme === 2 && "text-purple-300"}  uppercase  `}>Total: <span  className='text-purple-400'>${total}</span></p>
                    <p className={` ${colorTheme === 1 && "text-pink-300" || colorTheme === 2 && "text-purple-300"}  uppercase  `}>anticipo: <span className='text-purple-400'>${sumAdvanced}</span></p>
                    <p className={` ${colorTheme === 1 && "text-pink-300" || colorTheme === 2 && "text-purple-300"}  uppercase  `}>restante: <span className={` ${remaining <= 0 ? "text-green-500" : "text-rose-500"}`}>${remaining}</span></p>
                </div>
            </div>
        </div>
        <div className="flex justify-center gap-4">
            <ModalAdvance/>
            <button className={` ${colorTheme === 1 && "bg-pink-700" || colorTheme === 2 && "bg-purple-700"} text-white text-sm p-2 rounded-md shadow-md font-bold hover:scale-105 duration-200`} type="button"
            onClick={deleteAdvance}
            >BORRAR ANTICIPO</button>
        </div>
    </div>
  )
}
