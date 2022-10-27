import React from "react";
import {Table,Input,TableContainer,FormControl, Select, MenuItem,InputLabel,TableCell,TableBody,TableRow} from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";
import {BrowserRouter as Router} from "react-router-dom";
import CustomerMenu from "./CustomerMenu";
import ReactDOM from 'react-dom/client';
export default class PlaceOrder extends React.Component
{
    constructor()
    {
        super();
        this.state={
            email:sessionStorage.getItem("email"),
            mId:sessionStorage.getItem("mId"),
            movie:"",
            stype:"",
            qty:"",
            cardno:""
        }
    }

    componentDidMount()
    {
        axios.get("http://localhost:5204/api/Customer/GetMovieMultiplexById/"+this.state.mId).then(r=>{
            this.setState({movie:r.data})
        })
    }

    getData=(e)=>
    {
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value})
    }

    placeorder=()=>{
        const root = ReactDOM.createRoot(document.getElementById('root'));
        let st=this.state.stype;
        let price;
        if(this.state.qty<1)
        {
            alert("Quantity Cannot be less than 1");
            return ;
        }
        if(st==="Gold")
        {
            price=this.state.movie.goldSeatPrice;
        }
        else if(st==="Silver")
        {
            price=this.state.movie.silverSeatPrice;
        }
        else{
            price=this.state.movie.premiumSeatPrice;
        }

        const order={
            customerEmailId:this.state.email,
            register:null,
            adimnEmailId:this.state.movie.adminEmailId,
            multiplexName:this.state.movie.multiplexName,
            multiplexAddress:this.state.movie.multiplexAddress,
            movieName:this.state.movie.movieName,
            movieImage:this.state.movie.movieImage,
            directorName:this.state.movie.directorName,
            dateTimeFrom:this.state.movie.dateTimeFrom,
            dateTimeTo:this.state.movie.dateTimeTo,
            orderDate:new Date(),
            seatType:st,
            quantity:this.state.qty,
            cardNumber:this.state.cardno,
            seatPrice:price,
            totalPrice:this.state.qty*price,
            movieRating:0,
            multiplexRating:0,
        }
        console.log(order);
        axios.post("http://localhost:5204/api/Customer/PlaceOrder",order).then(r=>{
            if(r.data)
            {
                alert("Order Placed Successfully!!!");
            }
            root.render(<CustomerMenu/>)
        })

    }

    custmenu=()=>{
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<CustomerMenu/>)
    }

    render()
    {
        return(
            <>
                <div class="container-fluid">
                <Paper sx={{ width: '100%' }}>
                <Router>
                <nav>
                    <ol className="horizontal">
                        <li><button onClick={this.custmenu}>Customer Menu</button> </li>
                    </ol> 
                </nav>
                </Router>
                <TableContainer sx={{ maxHeight: 500}} >
                    <Table stickyHeader aria-label="sticky table" >
                    <TableBody>
                        <TableRow>
                            <TableCell align="center"><b>Gold Seat Aval:{this.state.movie.goldSeatAvl}</b></TableCell>
                            <TableCell align="center"><b>Gold Seat Price:{this.state.movie.goldSeatPrice} </b></TableCell>       
                        </TableRow>
                        <TableRow>
                            <TableCell align="center"><b>Silver Seat Aval:{this.state.movie.silverSeatAvl}</b></TableCell>
                            <TableCell align="center"><b>Silver Seat Price:{this.state.movie.silverSeatPrice}</b></TableCell>       
                        </TableRow>
                        <TableRow>
                            <TableCell align="center"><b>Premium Seat Aval:{this.state.movie.premiumSeatAvl}</b></TableCell>
                            <TableCell align="center"><b>Premium Seat Price:{this.state.movie.premiumSeatPrice}</b></TableCell>       
                        </TableRow>
                        <TableRow>
                            <TableCell align="center"><b>Choose Seat Type</b></TableCell>
                            <TableCell align="center">
                            <FormControl required fullWidth margin="normal">
                                <InputLabel htmlFor="stype" className="labels">Choose Seat Type</InputLabel>
                                <Select name="stype" onChange={this.getData} className="inputs" >
                                    <MenuItem value="Gold">Gold</MenuItem>
                                    <MenuItem value="Silver">Silver</MenuItem>
                                    <MenuItem value="Premium">Premium</MenuItem>
                                </Select>
                            </FormControl>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center"><b>Enter Quantity:</b></TableCell>
                            <TableCell align="center">
                            <InputLabel htmlFor="qty" className="labels">Enter quantity</InputLabel>
                            <Input className="inputs" name="qty" type="number" autoComplete="qty" disableUnderline={true} onChange={this.getData}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center"><b>Enter Card Number:</b></TableCell>
                            <TableCell align="center">
                            <InputLabel htmlFor="cardno" className="labels">Enter Card Number</InputLabel>
                            <Input className="inputs" name="cardno" type="number" autoComplete="cardno" disableUnderline={true} onChange={this.getData}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center" colSpan={2}>
                            <button class="btn btn-primary" onClick={this.placeorder}>Buy Now</button>
                            </TableCell>
                        </TableRow>

                    </TableBody>
                    </Table>
                </TableContainer>
                </Paper> 
                </div> 
            </>
        )
    }
}
     

     
    
