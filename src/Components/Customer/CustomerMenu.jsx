import axios from "axios";
import React from "react";
import ShoppingCarticon from "@mui/icons-material/ShoppingCart";
import { Button } from "@mui/material";
import {BrowserRouter as Router , Link  , Route , Routes} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import ChangePassword from "../Authenticate/ChangePassword";
import GiveRating from "../Authenticate/GiveAppRating";
import MyOrder from "./myOrder";
import AllMovies from "./AllMovie";
import MovieByTime from "./MovieByTime";
import Home from "../Authenticate/Home";
import ShowCart from "./ShowCart";
import PlaceOrder from "./PlaceOrder";
export default class CustomerMenu extends React.Component
{
    constructor()
    {
        super();
        this.state={
            email:sessionStorage.getItem("email"),
            n:'',
            movie:[]
        }
    }
    componentDidMount()
    {
        axios.get("http://localhost:5204/api/Customer/ShowAllMovies").then(r=>{
            this.setState({movie:r.data})
        });

        axios.get("http://localhost:5204/api/Customer/ShowCart/"+this.state.email).then(r=>{
            this.setState({n:r.data.length});
        })
    }

    showcart=()=>{
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<ShowCart/>)
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

    order=()=>{
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<MyOrder/>)
    }

    moviebytime=()=>{
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<MovieByTime/>)
    }

    home=()=>{
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<Home/>)
    }
    Order=(i)=>{
        sessionStorage.setItem("mId",i.mId);
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<PlaceOrder/>)
    }

    render()
    {
        return(
            <>
            <div class="container-fluid">
                <Router>
                    <nav>
                        <ol className="horizontal">
                            <li><button onClick={this.home}>Home Page</button></li>
                            <li><Link to="AllMovies">Movie</Link></li>
                            <li><button onClick={this.moviebytime}>Movie By Time</button></li>
                            <li><button onClick={this.order}>My Order</button> </li>
                            <li><Link to="ChangePassword">Change Password</Link></li>
                            <li><Link to="AppRating">Give App Rating</Link></li>
                            <li class="rightcorner">
                                <Button  variant="contained"
                                onClick={this.showcart} >
                                    <div>{<ShoppingCarticon/>} </div>
                                    <div class="badge bg-danger">{this.state.n}</div>
                                </Button>
                            </li>
                        </ol> 
                        <Routes>
                            <Route exact path="/ChangePassword" element={<ChangePassword/>}></Route>
                            <Route exact path="/AppRating" element={<GiveRating/>}></Route>
                            <Route exact path="/AllMovies" element={<AllMovies/>}></Route>
                        </Routes>
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
                        <button  onClick={this.Order.bind(this,i)}>Place Order</button>
                        </div>
                    )}
                </div>
            </div>
            </>
        )
    }
}