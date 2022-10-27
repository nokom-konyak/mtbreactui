import axios from "axios";
import React from "react";
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, json} from "react-router-dom";
import CustomerMenu from "./CustomerMenu";
import PlaceOrder from "./PlaceOrder";
export default class ShowCart extends React.Component
{
    constructor()
    {
        super();
        this.state={
            email:sessionStorage.getItem("email"),
            movie:[],
            flag:false
        }
        this.getData();
        
    }
    getData=()=>{    
        axios.get("http://localhost:5204/api/Customer/ShowCart/"+this.state.email).then(r=>{
        //console.log(r.data);
        for(let i=0;i<r.data.length;i++)
        {
            axios.get("http://localhost:5204/api/Customer/GetMovieMultiplexById/"+r.data[i].mId).then (x=>{ 
                //this.state.movie.push(x.data);
                this.state.movie[i]=x.data;
            })
        }
        });
        console.log("inside Get Data")
        console.log("movie data")
        console.log(this.state.movie.length);
        console.log(this.state.movie);
        
    };
    // componentDidMount()
    // {
    //     this.getData();
    // }
    
     OrderNow=(i)=>{
        sessionStorage.setItem("mId",i.mId.toString());
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<PlaceOrder/>)
    }

    Delete=(i)=>{
        axios.delete("http://localhost:5204/api/Customer/DeleteCartItem/"+i.register).then(r=>{
            if(r.data)
            {
                alert("Cart Item Deleted");
            }
            const root = ReactDOM.createRoot(document.getElementById('root'));
            root.render(<ShowCart/>)
        })
    }

    custmenu=()=>{
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<CustomerMenu/>)
    }

    render()
    {
        let length=this.state.movie.length;
        {console.log("let length")}
        {console.log(length)}
        return(
            <div class="loop-container">
                <Router>
                <nav>
                    <ol className="horizontal">
                        <li><button onClick={this.custmenu}>Customer Menu</button> </li>
                    </ol> 
                </nav>
                </Router> 
                <div class="row">
                    {console.log("inside return")}
                    {console.log(this.state.movie)}
                    

                    <h2>Cart Header</h2>
                    <div class="row">
                    {this.state.movie.map((index,i)=>(
                        <div class="card col-md-3">
                        <img src ={i.movieImage} alt="Card image"/>
                        <p class="card-text">Movie name: {i.movieName}</p>
                        <p class="card-text">{i.multiplexName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{i.multiplexAddress}</p>
                        <p class="card-text">{i.dateTimeFrom} To {i.dateTimeTo}</p>
                        <p class="card-text">Seat Avl---- Gold:{i.goldSeatAvl} &nbsp;&nbsp; Silver:{i.silverSeatAvl}&nbsp;&nbsp; Premium:{i.premiumSeatAvl}</p>
                        <p class="card-text">Ticket Price ---- Gold:{i.goldSeatPrice} &nbsp;&nbsp; Silver:{i.silverSeatPrice}&nbsp;&nbsp; Premium:{i.premiumSeatPrice}</p>
                        <br/>
                        <button class="btn btn-primary" onClick={this.OrderNow.bind(this,i)}>Place Order</button>
                        <button class="btn btn-primary" onClick={this.Delete.bind(this,i)}>Delete</button>
                        </div>
                        )
                    )
                    }
                </div>  
                    
                    <h2>Cart End</h2>
                </div>
            </div>
        ) 
    }    
}