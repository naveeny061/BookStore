import Axiom from "./axiomService";

const httpService = new Axiom();

export default class userService{
    baseUrl = "https://backend-bookstore.herokuapp.com/"
    registration = (data) =>{
        return httpService.Post(`${this.baseUrl}bookstore_user/registration`, data);
    }
    login = (data) => {
        return httpService.Post(`${this.baseUrl}bookstore_user/login`, data);
    }
    books = () => {
        return httpService.Get(`${this.baseUrl}bookstore_user/get/book`);
    }
    addToCart = (product_id,token) => {
        // console.log(product_id)
        // console.log(token)
        return httpService.Post(`https://backend-bookstore.herokuapp.com/bookstore_user/add_cart_item/${product_id}`, false,{
            headers:{
                "x-access-token": `${token}`
            }
        });
    }
    getCartBook = (token) => {
        return httpService.Get(`https://backend-bookstore.herokuapp.com​/bookstore_user/get_cart_items`,{
            headers: {
                "x-access-token": `${token}`,
            }
        });
    }
    quantity = (data , itemID ,token) => {
        return httpService.Put(`https://backend-bookstore.herokuapp.com/bookstore_user/cart_item_quantity/${itemID}`, data,{
            headers: {
                "x-access-token": `${token}`,
            }
        });
    }
    remove = (itemID ,token) => {
        return httpService.Delete(`https://backend-bookstore.herokuapp.com/bookstore_user/remove_cart_item/${itemID}`,{
            headers: {
                "x-access-token": `${token}`,
            }
        });
    }
    customerDetails = (data,token) => {
        return httpService.Put(`https://backend-bookstore.herokuapp.com/bookstore_user/edit_user`, data,{
            headers: {
                "x-access-token": `${token}`,
            }
        });
    }
    Order = (data,token) => {
        return httpService.Post(`https://backend-bookstore.herokuapp.com/bookstore_user/add/order`, data,{
            headers: {
                "x-access-token": `${token}`,
            }
        });
    }
}