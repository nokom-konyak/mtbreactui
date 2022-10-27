import axios from "axios";
import React from "react";
import '../../App.css';
export default class AllOrder extends React.Component {
    constructor() {
        super();
        this.state = {
            email:sessionStorage.getItem("email"),
            Order:[]
        }
    }
    componentDidMount()
    {
        axios.get("http://localhost:5204/api/Owner/showAllOrders").then(r => {
            if (r.data) {
                this.setState({Order:r.data});
            }
        });
    }

    render() {
        return (
            <>
            <div class="container-fluid">
                <div class="row">
                    {this.state.Order.map(i=>
                        <div class="card col-md-3"  >
                        <p class="card-text">Order Id : {i.orderId} </p>
                        <img src ={i.movieImage} alt="Card image"/>
                        <p class="card-text">Customer EmailId : {i.customerEmailId}</p>
                        <p class="card-text">Movie name : {i.movieName}</p>
                        <p class="card-text">{i.multiplexName} &nbsp;&nbsp;&nbsp;&nbsp;{i.multiplexAddress}</p>
                        <p class="card-text">{i.dateTimeFrom} To {i.dateTimeTo}</p>
                        <p class="card-text">Ticket Type: {i.seatType} Price: {i.seatPrice} Quantity: {i.quantity}</p>
                        <p class="card-text">Total Amount Paid : {i.totalPrice}</p>
                        </div>
                    )}
                </div>
            </div>
            </>
        )
    }
}