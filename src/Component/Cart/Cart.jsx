import React from 'react'
import AppBar from "../AppBar/appBar";
import "./Cart.css";
import MyCart from "../MyCart/MyCart";
import Footer from '../footer/footer';
import "./Cart.css";
// import CostumerDetails from "../CostumerDetails/CostumerDetails";
// import OrderSummary from "../OrderSummary/OrderSummary";
import Service from '../../services/userServices'

const services = new Service()


export default function Cart() {
    const [cartList, setCartList] = React.useState([]);
    const getCartBooks = () => {
        services.getCartBook(localStorage.getItem("userToken")).then((result) => {
            console.log(result)
            setCartList(result.data.result)
        })
            .catch((error) => {
                console.log(error)
            })
    }
    React.useEffect(() => {
        getCartBooks()
    }, [])
    return (
        <div className='cart-details'>
            <AppBar/>
            <MyCart cartList={cartList} getCartBooks={getCartBooks}/>
            <Footer/>
        </div>
    )
}