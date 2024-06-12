import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import useShein from "./hook/useShein"
import { ContextProps } from "./types"
import { useEffect } from "react"

export default function Layout() {
  const {colorTheme, setDateModal} = useShein() as ContextProps

  useEffect(() => {
    const handlePopState = () => {
      setDateModal(false)
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div className={` ${colorTheme === 1 && "bg-pink-200" || colorTheme === 2 && "bg-purple-200"}  h-screen w-full fixed`}>
      <div>
        <Header/>
      </div>
      
      <div className="">
        <Outlet/>
      </div>

      <div >
        <Footer/>
      </div>
    </div>
  )
}
