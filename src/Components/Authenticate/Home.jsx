import React from "react";
import ReactDOM from 'react-dom/client';
import axios from "axios";
import {BrowserRouter as Router , Link  , Route , Routes} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import '../../index.css';
import { Button } from "@mui/material";
import ShoppingCarticon from "@mui/icons-material/ShoppingCart";
export default class Home extends React.Component
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
            console.log(r.data)
            this.setState({movie:r.data})
        });
    }
    login=()=>{
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<Login/>)
    }
    register=()=>{
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<Register/>)
    }
    forgotpassword=()=>{
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<ForgotPassword/>)
    }
    
    render()
    {
        return(
            <>
            <div class="container-fluid">
                <Router>
                    <nav>
                        <ol className="horizontal">
                            <li><button variant="contained" onClick={this.login}>Login</button> </li>
                            <li><button variant="contained" onClick={this.register}>Register</button> </li>
                            <li><button variant="contained" onClick={this.forgotpassword}>Forgot Password</button> </li>
                            <li class="rightcorner">
                                <Button  variant="contained" color="primary" 
                                onClick={this.login} >
                                    <div>{<ShoppingCarticon/>} </div>
                                    <div class="badge bg-danger">00</div>
                                </Button>
                            </li>
                        </ol>
                    </nav>
                </Router>
                <div class="row">
                    {this.state.movie.map(i=>
                        <div class="card col-md-3">
                        <img src ={i.movieImage} alt="Card image"/>
                        <p class="card-text">Movie name: {i.movieName}</p>
                        <p class="card-text">{i.multiplexName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{i.multiplexAddress}</p>
                        <p class="card-text">{i.dateTimeFrom} To {i.dateTimeTo}</p>
                        <p class="card-text">Seat Avl---- Gold:{i.goldSeatAvl} &nbsp;&nbsp; Silver:{i.silverSeatAvl}&nbsp;&nbsp; Premium:{i.premiumSeatAvl}</p>
                        <p class="card-text">Ticket Price ---- Gold:{i.goldSeatPrice} &nbsp;&nbsp; Silver:{i.silverSeatPrice}&nbsp;&nbsp; Premium:{i.premiumSeatPrice}</p>
                        <br/>
                        <button class="btn btn-primary" onClick={this.login}>Add To Cart</button>
                        </div>
                    )}
                </div>
            </div>
            </>
        )
    }
}
