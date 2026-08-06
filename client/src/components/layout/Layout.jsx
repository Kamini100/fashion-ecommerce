import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";

function Layout(){
    return(
        <>
        <Navbar/>
        <main style={{minHeight: "80vh", padding: "20px"}}>
            <Outlet/>
        </main>
        <Footer/>
        </>
    );
}

export default Layout;