import React from "react";
import AppBar from "../AppBar/appBar";
import "./Dashboard.css";
import Display from "../Display/Display";
import Footer from "../footer/footer";
// import Cart from "../Cart/Cart";
// import {Switch, Route} from 'react-router-dom'
import Service from '../../services/userServices'

const services = new Service()

export default function Dashboard(){
    const [cart, setCart] = React.useState([])
    const getCartBooks = () => {
        services.getCartBook(localStorage.getItem("userToken")).then((res) => {
            setCart(res.data.result)
            console.log(res.data.result)
        })
            .catch((err) => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        getCartBooks()
    }, [])

    return(
        <div>
            <AppBar/>
            <Display cart={cart} getCartBooks={getCartBooks}/>
            {/* <Cart/>              */}
            <Footer/>
        </div>
    );
}