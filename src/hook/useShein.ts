import { useContext } from "react";
import SheinContext from "../context/SheinProvider";

const useShein = () => {
    return useContext(SheinContext)
}

export default useShein