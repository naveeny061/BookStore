import React from 'react'
import TextField from '@material-ui/core/TextField';
import './login.css'
import Button from '@material-ui/core/Button';
import Service from '../../services/userServices';
import Image from "../../assests/logo.png";
import SnackBar from "@material-ui/core/Snackbar";
import { IconButton } from '@material-ui/core'

const services = new Service()

export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:'',
            emailErrorFlag:false,
            emailMsg:"Enter registered email",
            passwordErrorFlag:false,
            passwordMsg:'',
            snackBarOpen: false,
            snackBarMsg:"Login Successful"
        }
    }
    snackbarClose = (event) =>{
        this.setState({
            snackbarOpen:false
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    validate = () =>{
        var isValid = true
        this.setState({
            emailErrorFlag:false,
            emailMsg:"Enter registered email",
            passwordErrorFlag:false,
            passwordMsg:'',
        })     
        if(this.state.email.length === 0){
            this.setState({
                emailErrorFlag:true,
                emailMsg:'Email is required'
            })
            isValid = false
        }else if(!this.state.email.match(/^[a-zA-Z][a-zA-Z0-9]*([.+-][a-zA-Z0-9]+)*(@[a-zA-Z0-9]+[.][a-zA-Z0-9]{2,})([.][a-zA-Z]{2,4})?$/)) {
            this.setState({
                emailErrorFlag : true,
                emailMsg:'Email is not valid'
            })
            isValid = false
        }
        if(this.state.password.length === 0){
            this.setState({
                passwordErrorFlag : true,
                passwordMsg:'Password is required'
            })
            isValid = false
        }else if(!this.state.password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!(?:.*[!@#$%^&*]){2})[a-zA-Z0-9!@#$%^&*]{8,}$/)) {
            this.setState({
                passwordErrorFlag : true,
                passwordMsg:'Password is not valid'
            })
            isValid = false
        }
        return isValid;
    }
    onSubmit =()=>{
        if(!this.validate()){
            console.log('login fail');
        }else { 
            let userData = {
                'email': this.state.email,
                'password': this.state.password,
            }
            services.login(userData).then(result => {
                console.log(result);
                localStorage.setItem("userToken",result.data.result.accessToken);
                this.setState(
                    {
                        snackbarOpen: true
                    })
                this.reset();
            }).catch(error => {
                console.log(error);
            })    
        }
    }
    reset =()=>{
        this.setState({
            email:'',
            password:''
        })
    }
    render(){
        return(
            <div className='main-login'>
                <div className='leftContainer-login'>
                    <img className='image' src={Image} alt=""/>
                    <span className='text'>Online Book Store</span>
                </div>
                <form className='form'>
                    <TextField className='textField' name='email' label="Email" value={this.state.email}
                        onChange={this.handleChange}  error={this.state.emailErrorFlag} variant="outlined" size="small" 
                        helperText={this.state.emailMsg}/>
                    <TextField className='textField' name='password' label="Password" value={this.state.password}
                        onChange={this.handleChange}  error={this.state.passwordErrorFlag} variant="outlined" size="small" 
                        helperText={this.state.passwordMsg}/>
                    <Button href="./registration">Sign up instead</Button>
                    <Button  variant="contained" className='button' onClick={this.onSubmit} value='submit' >Next</Button>
                </form>
                <SnackBar 
                    anchorOrigin={{vertical:'bottom',horizontal:'center'}}
                    open = {this.state.snackbarOpen}
                    autoHideDuration={3000}
                    onClose={this.snackbarClose}
                    message={this.state.snackBarMsg}
                    action={[
                        <IconButton 
                        key='close'
                        arial-label='close'
                         color='inherit'
                        onClick={this.snackbarClose}>
                            x
                        </IconButton>
                    ]}
                    />
            </div>
        );
    }
}