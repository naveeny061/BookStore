import React from "react";
import "./OrderSummary.css";
import Image from "../../assests/textbook.png";
import Button from '@material-ui/core/Button'

export default function OrderSummary(props){
    return(
        <div className="orderSummary">
            <div>
                <span className="orderSummary-text">Order Summary</span>
            </div>
            <div className="orderSummary-details">
                {props.cartList.map((item) => (
                    <div className="orderbook-details">
                        <div>
                            <img className="image" src={Image} alt="" />
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
                <Button variant="contained" color="primary">
                    Checkout
                </Button>
            </div>
        </div>
    )
}