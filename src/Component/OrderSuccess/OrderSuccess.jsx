import React from 'react'
import './OrderSuccess.css'
import Image from '../../assests/fireworks.svg'
import { Button } from '@material-ui/core'
import { Redirect } from 'react-router-dom'

export default function OrderSuccess() {
    const[redirect, setRedirect] = React.useState(false)
    
    const handleClick = () =>{
        setRedirect(true)
    }
    if(redirect){
        return <Redirect to='/dashboard' />
    }
    return (
        <div className="orderSuccess">
            <div className="image">
                <img src={Image} alt='' />
                <div className="successfull-text">
                    Order placed successfully
                </div>
            </div>
            <div className="orderId">
                <span>hurray!!! your order is confirmed</span><br/>
                <span>the order id is #123456 save the order id for</span><br/> 
                <span>further communication..</span>
            </div>
            <div className="orderSuccess-box">
                <span className="orderSuccess-details">Email us</span>
                <span className="orderSuccess-details">Contact us</span>
                <span className="orderSuccess-details">Address</span>
            </div>
            <div className="orderSuccess-box">
                <span className="orderSuccess-details box-width">admin@bookstore.com</span>
                <span className="orderSuccess-details box-width">+91 8163475881</span>
                <span className="orderSuccess-details box-width"> 42, 14th Main, 15th Cross, Sector 4 ,opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore 560034</span>
            </div>
            <div className="continueShopping">
                <Button variant="contained" color="primary" onClick={handleClick}>
                    Continue shopping
                </Button>
            </div>          
        </div>
    )
}