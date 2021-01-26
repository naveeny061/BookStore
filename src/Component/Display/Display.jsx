import React from "react";
import Service from '../../services/userServices'
import Image from "../../assests/textbook.png";
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import './Display.css';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

const services = new Service()

const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default function Display(props){
    const classes =useStyles();
    const [booksList, setBooksList] = React.useState([]);
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    }
    const AllBooks = () => {
        services.books().then((result) => {
            console.log(result); 
            setBooksList(result.data.result)
            booksList.map(item => item.isAdded = false)
        })
            .catch((error) => {
                console.log(error)
            })
    }
    React.useEffect(() => {
        AllBooks()
    },[])
    
    const addCart = (productId) => {
        services.addToCart(productId,localStorage.getItem("userToken")).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })
    }
    const cartButton = (bookItem) => {
        props.cart.map(item => {
            if (item.product_id._id === bookItem._id) {
                bookItem.isAdded = true
            }
            // console.log(index.isAdded)
        })
    }

    return(
        <div>
            <div className='display'>
                <div className='heading'>
                    <div>
                        <span>Books</span>
                        <span className='booksNumber'> ({booksList.length} items)</span>
                    </div>
                    <div>
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-filled-label">Sort by referance</InputLabel>
                        <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={age}
                        onChange={handleChange}
                        >
                            <MenuItem value={10}>Price: Low to High</MenuItem>
                            <MenuItem value={20}>Price: High to Low</MenuItem>
                            <MenuItem value={30}>Newest Arrival</MenuItem>
                        </Select>
                    </FormControl>
                    </div>    
                </div>
                <div className="display-book">
                    {booksList.map((item) => (
                        <div className='book'>
                            <div className='images'>
                                <img className='display-image' src={Image} alt="img"/>
                                <span className='description'>{item.description}</span>
                            </div>
                            <div className='details'>
                                <div className="bookName">
                                    {item.bookName}
                                </div>
                                <div className="bookAuther">
                                    by {item.author}
                                </div>
                                <div className="bookCost">
                                    Rs{item.price}
                                </div>
                                <div className="option">
                                    {
                                        // console.log(item)
                                        item.isAdded ?
                                        <Button variant="contained" className="display-button2" onClick ={() => {addCart(item._id)}} >Added to Bag</Button>
                                    : <> 
                                    <Button variant="contained" className="display-button" onClick ={() => {addCart(item._id)}} >Add To Bag</Button>
                                    <Button variant="contained" className="wishList">Wishlist</Button>
                                    </>
                                    }
                                    {cartButton(item)}                               
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}