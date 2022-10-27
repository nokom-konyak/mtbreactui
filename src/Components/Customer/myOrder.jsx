import axios from "axios";
import React from "react";
import '../../App.css';
import {BrowserRouter as Router} from "react-router-dom";
import CustomerMenu from "./CustomerMenu";
import ReactDOM from 'react-dom/client';
import OrderRating from "./OrderRating";
export default class MyOrder extends React.Component {
    constructor() {
        super();
        this.state = {
            email:sessionStorage.getItem("email"),
            order:[]
        }
    }
    componentDidMount()
    {
        axios.get("http://localhost:5204/api/Customer/ShowOrderByCustomerEmailId/"+this.state.email).then(r => {
            if (r.data) {
                this.setState({order:r.data});
            }
        })
    }
    custmenu=()=>{
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<CustomerMenu/>)
    }

    orderrating=(i)=>{
        sessionStorage.setItem("OrderId",i.orderId);
        sessionStorage.setItem("movieimg",i.movieImage);
        sessionStorage.setItem("moviename",i.movieName);
        sessionStorage.setItem("multiplexname",i.multiplexName);
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<OrderRating/>);
    }
    
    render() {
        return (
            <>
            <div class="container-fluid">

            <Router>
                <nav>
                    <ol className="horizontal">
                        <li><button onClick={this.custmenu}>Customer Menu</button> </li>
                    </ol> 
                </nav>
            </Router> 


            <div class="row">
                {this.state.order.map(i=>
                    <div class="card col-md-3"  >
                    <img src ={i.movieImage} alt="Card image"/>
                    <p class="card-text">Order Id : {i.orderId} </p>
                    <p class="card-text">Customer EmailId : {i.customerEmailId}</p>
                    <p class="card-text">Movie name : {i.movieName}</p>
                    <p class="card-text">Multiplex name : {i.multiplexName}</p>
                    <p class="card-text">Ticket Type : {i.seatType}</p>
                    <p class="card-text">Quantity : {i.quantity}</p>
                    <p class="card-text">Total Amount : {i.totalPrice}</p>
                    <br/>
                    <button class="btn btn-primary" onClick={this.orderrating.bind(this,i)}>Give Rating</button>
                    </div>
                )}
            </div>
            </div>
            </>
        )
    }
}