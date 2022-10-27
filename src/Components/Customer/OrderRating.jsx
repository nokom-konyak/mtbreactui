import {Input,InputLabel,FormControl, Select, MenuItem,Table,TableCell,TableBody,TableRow, TableContainer} from "@mui/material";
import React from "react";
import '../../App.css';
import {BrowserRouter as Router} from "react-router-dom";
import CustomerMenu from "./CustomerMenu";
import ReactDOM from 'react-dom/client';
import axios from "axios";
import MyOrder from "./myOrder";
export default class OrderRating extends React.Component {
    constructor() {
        super();
        this.state = {
            email:sessionStorage.getItem("email"),
            oId:sessionStorage.getItem("OrderId"),
            mimage:sessionStorage.getItem("movieimg"),
            mname:sessionStorage.getItem("moviename"),
            mulname:sessionStorage.getItem("multiplexname"),
            mrating:"",
            Mrating:""
        }
    }
    getData=(e)=>{
        this.setState({[e.target.name]:e.target.value});
     }

    orderrating=()=>{
        const root = ReactDOM.createRoot(document.getElementById('root'));
        let Oid=this.state.oId;
        let mr=this.state.mrating;
        let Mr=this.state.Mrating;
        axios.put("http://localhost:5204/api/Customer/GiveRating/"+Oid+"/"+mr+"/"+Mr).then(r=>{
            if(r.data)
            {
                alert("Thank You For Your Time");
                root.render(<MyOrder/>);
            }
        })
    }

    custmenu=()=>{
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<CustomerMenu/>)
    }

    render() {
        return (
            <div class="container-fluid">
                <Router>
                <nav>
                    <ol className="horizontal">
                        <li><button onClick={this.custmenu}>Customer Menu</button> </li>
                    </ol> 
                </nav>
            </Router> 
            <TableContainer sx={{ maxWidth:800}} >
                    <Table stickyHeader aria-label="sticky table" >
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2} align="center"><img src={this.state.mimage} alt="movie Poster"/></TableCell>       
                        </TableRow>
                        <TableRow>
                            <TableCell align="center"><b>Movie Name:{this.state.mname}</b></TableCell>
                            <TableCell align="center"><b>Multiplex Name:{this.state.mulname}</b></TableCell>       
                        </TableRow>
                        <TableRow>
                            <TableCell>Give Movie Rating : ( 1 lowest and 5 Highest ) </TableCell>
                            <TableCell>
                                <FormControl required fullWidth margin="normal">
                                <InputLabel htmlFor="question" className="labels">Enter Movie Rating</InputLabel>
                                <Select name="mrating" onChange={this.getData} className="inputs" >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                </Select>
                            </FormControl> 
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell >Give Multiplex Rating : ( 1 lowest and 5 Highest ) </TableCell>
                            <TableCell>
                            <FormControl required fullWidth margin="normal">
                                    <InputLabel htmlFor="question" className="labels">Enter Multiplex Rating</InputLabel>
                                <Select name="Mrating" onChange={this.getData} className="inputs" >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                </Select>
                            </FormControl> 
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2} align="center"><button onClick={this.orderrating}>Order Rating</button> </TableCell>       
                        </TableRow>
                    </TableBody>
                    </Table>
            </TableContainer>
            </div>
        )
    }
}