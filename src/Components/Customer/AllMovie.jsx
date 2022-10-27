import axios from "axios";
import React from "react";
import ReactDOM from 'react-dom/client';
import CustomerMenu from "./CustomerMenu";
import PlaceOrder from "./PlaceOrder";
export default class AllMovies extends React.Component
{
    constructor()
    {
        super();
        this.state={
            email:sessionStorage.getItem("email"),
            movie:[]
        }
    }
    componentDidMount()
    {
        axios.get("http://localhost:5204/api/Customer/ShowAllMovies").then(r=>{
            this.setState({movie:r.data})
        });
    }

    AddToCart=(i)=>{
        const root = ReactDOM.createRoot(document.getElementById('root'));
        const c={
            customerEmailId:this.state.email,
            mId:i.mId
        }
        axios.post("http://localhost:5204/api/Customer/AddToCart",c).then(r=>{
            root.render(<CustomerMenu/>)
        })

    }
    Order=(i)=>{
        sessionStorage.setItem("mId",i.mId);
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<PlaceOrder/>)
    }

    render()
    {
        return(
            <div class="container-fluid">
            <div class="row">
                    {this.state.movie.map(i=>
                        <div class="card col-md-3"  >
                        <img src ={i.movieImage} alt="Card image"/>
                        <p class="card-text">Movie name: {i.movieName}</p>
                        <p class="card-text">{i.multiplexName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{i.multiplexAddress}</p>
                        <p class="card-text">{i.dateTimeFrom} To {i.dateTimeTo}</p>
                        <p class="card-text">Seat Avl---- Gold:{i.goldSeatAvl} &nbsp;&nbsp; Silver:{i.silverSeatAvl}&nbsp;&nbsp; Premium:{i.premiumSeatAvl}</p>
                        <p class="card-text">Ticket Price ---- Gold:{i.goldSeatPrice} &nbsp;&nbsp; Silver:{i.silverSeatPrice}&nbsp;&nbsp; Premium:{i.premiumSeatPrice}</p>
                        <br/>
                        <button class="btn btn-primary" onClick={this.AddToCart.bind(this,i)}>Add To Cart</button>
                        <button  onClick={this.Order.bind(this,i)}>Place Order</button>
                        </div>
                    )}
            </div>
            </div>
        )
    }     
}