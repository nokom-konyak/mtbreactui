import axios from "axios";
import React from "react";
import '../../App.css';
export default class AdminOrder extends React.Component {
    constructor() {
        super();
        this.state = {
            email:sessionStorage.getItem("email"),
            movie:[]
        }
    }
    componentDidMount()
    {
        axios.get("http://localhost:5204/api/admin/ShowOrderByAdminEmail/"+this.state.email).then(r => {
            if (r.data) {
                this.setState({movie:r.data});
            }
        });
    }

    render() {
        return (
            <>
            <div class="container-fluid">
                <div class="row">
                    {this.state.movie.map(i=>
                        <div class="card col-md-3"  >
                        <img src ={i.movieImage} alt="Card image"/>
                        <p class="card-text">Order Id : {i.orderId} </p>
                        <p class="card-text">Customer EmailId : {i.customerEmailId}</p>
                        <p class="card-text">Movie name : {i.movieName}</p>
                        <p class="card-text">Multiplex name : {i.multiplexName}</p>
                        <p class="card-text">Ticket Type : {i.seatType}</p>
                        <p class="card-text">Quantity : {i.quantity}</p>
                        <p class="card-text">Total Amount : {i.totalPrice}</p>
                        </div>
                    )}
                </div>
            </div>
            </>
        )
    }
}