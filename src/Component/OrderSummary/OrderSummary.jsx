import React from "react";
import "./OrderSummary.css";
import Image from "../../assests/textbook.png";
import Button from '@material-ui/core/Button'
import Service from '../../services/userServices'
import { Redirect } from 'react-router-dom'

const services = new Service()

export default function OrderSummary(props){
    const[redirect, setRedirect] = React.useState(false)

    const hadleClick = () => {
        let list = []
        props.cartList.map((item)=> {           
            let orders = {
                "product_id": item.product_id._id,
                "product_name": item.product_id.bookName,
                "product_quantity": item.quantityToBuy,
                "product_price": item.product_id.price
            }
            list = [...list , orders]            
        })      
        let data = {
            "orders" : list
        }
        services.Order(data, localStorage.getItem("userToken")).then(result => {
            console.log(result)
            props.cartList.map((item) => {
                // console.log()
                props.removeBook(item._id)
            })
            setRedirect(true)
        }).catch((error) => {
            console.log(error)
        })
    }
    if(redirect){
        console.log(redirect)
        return <Redirect to='/orderPlaced' />
    }
    return(
        <div className="orderSummary">
            <div className="order">
                <span className="orderSummary-text">Order Summary</span>
            </div>
            {console.log(!props.displayOrderSummary) }
            {props.displayOrderSummary ? <>
                    <div className="orderSummary-details">
                    {props.cartList.map((item) => (
                        <div className="orderbook-details">
                            <div>
                                <img className="image1" src={Image} alt="" />
                            </div>
                            <div className="bookdetails">
                                <div className="bookNameCart">
                                        {item.product_id.bookName}
                                </div>
                                <div className="bookAutherCart">
                                    by {item.product_id.author}
                                </div>
                                <div className="bookCostCart">
                                    Rs. {item.product_id.price}
                                </div>
                            </div>
                        </div>   
                    ))}
                </div>
                <div className="checkout">
                    <Button variant="contained" color="primary" onClick={hadleClick}>
                        Checkout
                    </Button>
                </div> </>
                :  null 
            }           
        </div>
    )
}