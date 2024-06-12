import { useState, useEffect } from "react"
import EditMenu from "./EditMenu"
import useShein from "../hook/useShein"
import { ContextProps } from "../types"
import Fade from "react-reveal/Fade"
import Bounce from "react-reveal/Bounce"




function Header() {
    const {colorTheme} = useShein() as ContextProps

    const localStorageTitle =()=> {
        const Title = localStorage.getItem('title')
        return Title ? JSON.parse(Title) : "Mi NEGOCIO"
    }
    const localStorageSubTitle =()=> {
        const SubTitle = localStorage.getItem('subtitle')
        return SubTitle ? JSON.parse(SubTitle) : "SHEIN"
    }

    const [headerTitle,setHeaderTitle] = useState<string>(localStorageTitle())
    const [headerSubtitle,setHeaderSubtitle] = useState<string>(localStorageSubTitle())
    
    useEffect(()=>{
        localStorage.setItem('title', JSON.stringify(headerTitle))
    },[headerTitle])
    useEffect(()=>{
        localStorage.setItem('subtitle', JSON.stringify(headerSubtitle))
    },[headerSubtitle])

    return (
        <>
        <Fade >
        <div className={` ${colorTheme === 1 ? "hue-rotate-0" : "-hue-rotate-30"} bg-[url("img/bg-header2.jpg")] filter  bg-cover bg-center w-full bg-pink-500 relative text-center p-1 lg:p-8 min-h-32 shadow-2xl lg:flex justify-center items-center`}>
            { <EditMenu 
            setHeaderTitle={setHeaderTitle}
            setHeaderSubtitle={setHeaderSubtitle}
            headerTitle={headerTitle}
            headerSubtitle={headerSubtitle}
            /> }
            <Bounce>
            <h1 className=' stephanie text text-5xl my-3 lg:my-0 lg:text-6xl  text-white'>{headerTitle}</h1>
            <span className='text-white lg:ms-3 font-bold text-3xl lg:text-lg font-serif '>{headerSubtitle}</span>
            </Bounce>
        </div>
        </Fade>
        </>
    )
}

export default Header
