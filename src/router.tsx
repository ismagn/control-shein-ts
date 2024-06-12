import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import DateList from "./components/DateList";
import Customers from "./components/Customers";
import Products from "./components/Products";




const router = createBrowserRouter([
    {
        path: '/', 
        element: <Layout/>,
        children:[
            {
                index: true,
                element:<DateList />
            },
            {
                path: '/customers',
                element:<Customers/>
            },
            {
                path: '/products',
                element:<Products/>
            }
        ]
    },
])

export default router