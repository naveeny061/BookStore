import React from "react";
import "./CostumerDetails.css";
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from "@material-ui/core/Button";
import Service from '../../services/userServices'
import OrderSummary from "../OrderSummary/OrderSummary";

const services = new Service()

export default function CostumerDetails(props){
    const [name ,setName] = React.useState("")
    const [mobileNumber,setMobileNumber] = React.useState("")
    const [pinCode,setPinCode] = React.useState("")
    const [locality,setLocality] = React.useState("")
    const [address,setAddress] = React.useState("")
    const [city,setCity] = React.useState("")
    const [landmark,setLandmark] = React.useState("")
    const [value, setValue] = React.useState('a');

    const [nameError ,setNameError] = React.useState("")
    const [nameErrorFlag ,setNameErrorFlag] = React.useState("")
    const [mobileNumberError ,setMobileNumberError] = React.useState("")
    const [mobileNumberErrorFlag ,setMobileNumberErrorFlag] = React.useState("")
    const [pinCodeError ,setPinCodeError] = React.useState("")
    const [pinCodeErrorFlag ,setPinCodeErrorFlag] = React.useState("")
    const [localityError ,setLocalityError] = React.useState("")
    const [localityErrorFlag ,setLocalityErrorFlag] = React.useState("")
    const [addressError ,setAddressError] = React.useState("")
    const [addressErrorFlag ,setAddressErrorFlag] = React.useState("")
    const [cityError ,setCityError] = React.useState("")
    const [cityErrorFlag ,setCityErrorFlag] = React.useState("")
    const [landmarkError ,setLandmarkError] = React.useState("")
    const [landmarkErrorFlag ,setLandmarkErrorFlag] = React.useState("")

    const [displayOrderSummary ,setdisplayOrderSummary] = React.useState(false)

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const validate = () => {
        let isvalid = true
        if(name === "" ) {
            isvalid = false
            setNameError("Name is required")
            setNameErrorFlag(true)
        }
        if(mobileNumber === "" ) {
            isvalid = false
            setMobileNumberError("phoneNumber is required")
            setMobileNumberErrorFlag(true)
        }
        if(pinCode === "" ) {
            isvalid = false
            setPinCodeError("Pincode is required")
            setPinCodeErrorFlag(true)
        }
        if(locality === "" ) {
            isvalid = false
            setLocalityError("Locality is required")
            setLocalityErrorFlag(true)
        }
        if(address === "" ) {
            isvalid = false
            setAddressError("Address is required")
            setAddressErrorFlag(true)
        }
        if(city === "" ) {
            isvalid = false
            setCityError("City/Town is required")
            setCityErrorFlag(true)
        }
        if(landmark === "" ) {
            isvalid = false
            setLandmarkError("Landmark  is required")
            setLandmarkErrorFlag(true)
        }
        return isvalid
    }
    const handleClick = () => {
        if(!validate()) {
            console.log("validation Fail")
        }
        else {
            let userData = {
                "addressType": value,
                "fullAddress": address +","+ locality +"," + pinCode ,
                "city": city,
                "state": landmark
            }
            services.customerDetails(userData, localStorage.getItem("userToken")).then(result => {
                console.log(result)
                setdisplayOrderSummary(true)

            }).catch((error) => {
                console.log(error)
            })
        }
       
    } 
    
    return(<>
        <div className="custumerDetails">
            <div className="custumer">
                <span className="custumerDetails-text">Customer details</span>
            </div>
            {props.displayCustomer ?
                // <div>
                    <>
                    <div className="contanier">
                        <form>
                        <div className="Row">
                            <TextField className="Field mr" label="Name" value={name} variant="outlined"
                                onChange={(e) => setName(e.target.value)}size='small' error={nameErrorFlag} helperText={nameError}/>
                            <TextField className="Field pd" label="MobileNumber" value={mobileNumber} variant="outlined"
                                onChange={(e) => setMobileNumber(e.target.value)} size='small' error={mobileNumberErrorFlag} helperText={mobileNumberError}/>
                        </div>
                        <div className="Row">
                            <TextField className="Field mr" label="Pin Code" value={pinCode} variant="outlined"
                                onChange={(e) => setPinCode(e.target.value)} size='small' error={pinCodeErrorFlag} helperText={pinCodeError}/>
                            <TextField className="Field pd" label="Locality" value={locality} variant="outlined"
                                onChange={(e) => setLocality(e.target.value)} size='small' error={localityErrorFlag} helperText={localityError}/>
                        </div>
                        <div className="Row">
                            <TextField className="Field " label="Address" value={address} variant="outlined" multiline fullWidth
                                onChange={(e) => setAddress(e.target.value)} size='small' error={addressErrorFlag} helperText={addressError}/>
                        </div>
                        <div className="Row">
                            <TextField className="Field mr" label="City/Town" value={city} variant="outlined"
                                onChange={(e) => setCity(e.target.value)} size='small' error={cityErrorFlag} helperText={cityError}/>
                            <TextField className="Field pd" label="Landmark" value={landmark} variant="outlined"
                                onChange={(e) => setLandmark(e.target.value)} size='small' error={landmarkErrorFlag} helperText={landmarkError}/>
                        </div>
                        <div className="Row">
                            <FormControl>
                                <span className="type-text">Type</span>
                                <RadioGroup className="type" value={value} onChange={handleChange}>
                                    <FormControlLabel value="Home" control={<Radio />} label="Home" />
                                    <FormControlLabel value="Work" control={<Radio />} label="Work" />
                                    <FormControlLabel value="Other" control={<Radio />} label="Other" color="primary" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        </form>
                    </div>
                    {/* </div> */}
                    <div className="Continue">
                        <Button  className="" variant="contained" color="primary" onClick={handleClick}>
                            Continue
                        </Button>
                    </div>
                </>  : null 
            }
        </div>
        <OrderSummary displayOrderSummary={displayOrderSummary} cartList={props.cartList} removeBook={props.removeBook}/>
        </>
    )
}