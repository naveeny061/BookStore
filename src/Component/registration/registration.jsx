import React from 'react'
import TextField from '@material-ui/core/TextField';
import './registration.css'
import Button from '@material-ui/core/Button';
import Service from '../../services/userServices';
import Image from "../../assests/logo.png";
import SnackBar from "@material-ui/core/Snackbar";
import { IconButton } from '@material-ui/core'
import {Redirect} from 'react-router-dom'

const services = new Service()

export default class Registration extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            redirect:false,
            fullName:'',
            email:'',
            password:'',
            confirmPassword:'',
            phoneNumber:'',
            fullNameErrorFlag:false,
            fullNameMsg:'',
            emailErrorFlag:false,
            emailMsg:"You can use letters,numbers and periods ",
            passwordErrorFlag:false,
            passwordMsg:'',
            confirmPasswordErrorFlag:false,
            confirmPasswordMsg:'',
            phoneNumberErrorFlag:false,
            phoneNumberMsg:'',
            snackBarOpen: false,
            snackBarMsg:"Registration Completed"
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
            fullNameErrorFlag:false,
            fullNameMsg:'',
            emailErrorFlag:false,
            emailMsg:"You can use letters,numbers and periods ",
            passwordErrorFlag:false,
            passwordMsg:'',
            confirmPasswordErrorFlag:false,
            confirmPasswordMsg:'',
            phoneNumberErrorFlag:false,
            phoneNumberMsg:''
        })
        if(this.state.fullName.length === 0){
             this.setState({
                 fullNameErrorFlag:true,
                 fullNameMsg:'Name is required'
             })
             isValid = false
        }else if(!this.state.fullName.match(/^[A-Z][a-z]{2,}[ ][A-Z][a-z]{2,}$/)) {
            this.setState({
                fullNameErrorFlag : true,
                fullNameMsg:'Name is not valid'
            })
            isValid = false
        }     
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
        if(this.state.confirmPassword.length === 0 ){
            this.setState({
                confirmPasswordErrorFlag : true,
                confirmPasswordMsg:'Password is required'
            })
            isValid = false
        }else if(this.state.confirmPassword !== this.state.password ){
            this.setState({
                confirmPasswordErrorFlag : true,
                confirmPasswordMsg:'Password does not match'
            })
            isValid = false
        }
        if(this.state.phoneNumber.length === 0 ){
            this.setState({
                phoneNumberErrorFlag : true,
                phoneNumberMsg:'Phone Number is required'
            })
            isValid = false
        }else if(!this.state.phoneNumber.match(/^[0-9]{10}$/)){
             this.setState({
                phoneNumberErrorFlag : true,
                phoneNumberMsg:'Phone Number is not valid'
            })
            isValid = false
        }
        return isValid;
    }
    onSubmit =()=>{
        if(!this.validate()){
            console.log('registration fail');
        }else { 
            let userData = {
                'fullName': this.state.fullName,
                'email': this.state.email,
                'password': this.state.password,
                'phone':    this.state.phoneNumber
            }
            services.registration(userData).then(result => {
                console.log(result)
                this.reset()
                this.setState(
                    {
                        snackbarOpen: true,
                        redirect:true
                    })
            }).catch(error => {
                console.log(error)
            })    
        }
    }
    reset =()=>{
        this.setState({
            fullName:'',
            email:'',
            password:'',
            confirmPassword:'',
            phoneNumber:''
        })
    }
    render(){
        if(this.state.redirect){
            return <Redirect to='/login' />
        }
        return(
            <div className='main'>
                <div className='leftContainer'>
                    <img className='image-reg' src={Image} alt=""/>
                    <span className='text'>Online Book Store</span>
                </div>
                <div>
                    <form className='form'>
                        <h3>Sign Up</h3>
                        <TextField className='textField' name='fullName' label="Full Name" value={this.state.fullName}
                            onChange={this.handleChange} error={this.state.fullNameErrorFlag} variant="outlined" size="small"
                            helperText={this.state.fullNameMsg} />
                        <TextField className='textField' name='email' label="Email" value={this.state.email}
                            onChange={this.handleChange}  error={this.state.emailErrorFlag} variant="outlined" size="small" 
                            helperText={this.state.emailMsg}/>
                        <TextField className='textField' name='password' label="Password" value={this.state.password}
                            onChange={this.handleChange}  error={this.state.passwordErrorFlag} variant="outlined" size="small" 
                            helperText={this.state.passwordMsg}/>
                        <TextField className='textField' name='confirmPassword' label="Confrim Password" value={this.state.confirmPassword}
                            onChange={this.handleChange}  error={this.state.confirmPasswordErrorFlag} variant="outlined" size="small" 
                            helperText={this.state.confirmPasswordMsg}/>
                        <TextField className='textField' name='phoneNumber' label="Phone Number" value={this.state.phoneNumber}
                            onChange={this.handleChange}  error={this.state.phoneNumberErrorFlag} variant="outlined" size="small" 
                            helperText={this.state.phoneNumberMsg}/>
                        <Button href="./login" >Sign in instead</Button>
                        <Button variant="contained" className='button-registration' onClick={this.onSubmit} value='submit' >Next</Button>
                    </form>
                </div>
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