import React from "react";
import AppBar from "../AppBar/appBar";
import "./Dashboard.css";
import Display from "../Display/Display";
import Footer from "../footer/footer";


export default function Dashboard(){
    return(
        <div>
            <AppBar/>
            <Display/>
            <Footer/>
        </div>
    );
}