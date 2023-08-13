import { createBrowserRouter } from "react-router-dom";

import LayoutAdmin from "./components/Layouts/LayoutAdmin";



import AdminProduct from "./pages/admin";
import AdminProductAdd from "./pages/admin/add";
import AdminProductEdit from "./pages/admin/edit";


export const router = createBrowserRouter([
    {
        path: "/admin",
         element: <LayoutAdmin/>,
         children: [
           {
            path: "product",
            element: <AdminProduct/>
           },
           {
            path: "product/add",
            element: <AdminProductAdd/>
           },
           {
            path: "product/:id/edit",
            element: <AdminProductEdit/>
           }
         ]
        
    }
])



            
 