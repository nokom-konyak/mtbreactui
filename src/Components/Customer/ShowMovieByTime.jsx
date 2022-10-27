import axios from "axios";
import {BrowserRouter as Router} from "react-router-dom";
import React from "react";
import ShoppingCarticon from "@mui/icons-material/ShoppingCart";
import { Button } from "@mui/material";
import ReactDOM from 'react-dom/client';
import CustomerMenu from "./CustomerMenu";
export default class ShowMovieByTime extends React.Component
{
    constructor()
    {
        super();
        this.state={
            email:sessionStorage.getItem("email"),
            movie:[],
            startT:sessionStorage.getItem("startT"),
            endT:sessionStorage.getItem("endT"),
            n:""
        }
    }
    componentDidMount()
    {
        axios.get("http://localhost:5204/api/Customer/ShowMovieByTime/"+this.state.startT+"/"+this.state.endT).then(r=>{
            this.setState({movie:r.data})
        });

        axios.get("http://localhost:5204/api/Customer/ShowCart/"+this.state.email).then(r=>{
            this.setState({n:r.data.length});
        })
    }

    AddToCart=(i)=>{
        const root = ReactDOM.createRoot(document.getElementById('root'));
        const c={
            customerEmailId:this.state.email,
            mId:i.mId
        }
        axios.post("http://localhost:5204/api/Customer/AddToCart",c).then(r=>{
            root.render(<ShowMovieByTime/>)
        })

    }

    custmenu=()=>{
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<CustomerMenu/>)
    }

    render()
    {
        return(
            <div class="container-fluid">
                <Router>
                <nav>
                    <ol className="horizontal">
                        <li><button onClick={this.custmenu}>Customer Menu</button> </li>
                        <li class="rightcorner">
                                <Button  variant="contained"
                                onClick={this.showcart} >
                                    <div>{<ShoppingCarticon/>} </div>
                                    <div class="badge bg-danger">{this.state.n}</div>
                                </Button>
                            </li>
                    </ol> 
                </nav>
            </Router> 
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
                        </div>
                    )}
            </div>
            </div>
        )
    }

        
}