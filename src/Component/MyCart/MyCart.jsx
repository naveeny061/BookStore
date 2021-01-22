import React from 'react'
import Service from '../../services/userServices'
import Image from "../../assests/textbook.png";
import "./MyCart.css";
import Button from '@material-ui/core/Button'

const services = new Service()

export default function MyCart(props) {
    // const [cartList, setCartList] = React.useState([]);
    const quantityUpdate = (itemID, quantity) => {
        let userData = {
            "quantityToBuy": quantity
        }
        services.quantity(userData, itemID, localStorage.getItem("userToken")).then(result => {
            console.log(result)
            props.getCartBooks()
        }).catch((error) => {
            console.log(error)
        })
    }
    const removeBook = (itemID) => {
        services.remove(itemID, localStorage.getItem("userToken")).then(result => {
            console.log(result)
            props.getCartBooks()
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
            <div className="myCart">
                <span className="myCart-text">My Cart</span>
                {props.cartList.map((item) => (
                    <div className="myCart-details">
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
                            <div className="cartUpdate">
                                <div className="cartUpdateQuantity" onClick={() => { quantityUpdate(item._id, item.quantityToBuy - 1) }}>
                                    -
                                </div>
                                <div className="cartQuantity">
                                    {item.quantityToBuy}
                                </div>
                                <div className="cartUpdateQuantity" onClick={() => { quantityUpdate(item._id, item.quantityToBuy + 1) }}>
                                    +
                                </div>
                                <div className="cartRemove" onClick={() => removeBook(item._id)}>
                                    Remove
                                </div>
                            </div>
                        </div>
                    </div>   
                ))}
                <div className="placeOrder">
                            <Button  className="placeOrderButton" variant="contained" color="primary">
                                PLACE ORDER
                            </Button>
                </div>
            </div>
    )
}