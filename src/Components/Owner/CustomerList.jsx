import React from "react";
import {Table,TableContainer,TableHead,TableCell,TableBody,TableRow} from "@mui/material";
import Paper from "@mui/material/Paper";
import '../../index.css'
import axios from "axios";
import ReactDOM from 'react-dom/client';
export default class CustomerList extends React.Component
{
     constructor()
     {
        super();
        this.state={
            email:sessionStorage.getItem("email"),
            customer:[] 
        };
     }

     componentDidMount()
    {
        axios.get("http://localhost:5204/api/Owner/ShowAllCustomer").then(r=>{
            this.setState({customer:r.data});
        })
    }

    Delete=(x)=>{
        const root = ReactDOM.createRoot(document.getElementById('root'));
        axios.delete("http://localhost:5204/api/Owner/DeleteCustomer/"+x.emailId).then(r=>{
            if(r.data)
            {
                alert("Customer Deleted Successfully!!!!")
                root.render(<CustomerList/>)
            }
            else{
                alert("Deletion Failed\nFK Constraint Conflict")
            }
        })
    }
    
     render()
     {
        return(
            <div class="container-fluid">
            <Paper sx={{ width: '100%' }}>
          <TableContainer sx={{ maxHeight: 500}} >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                 <TableCell align="center"><b>Customer Name</b></TableCell>
                 <TableCell align="center"><b>Customer Email Id</b></TableCell>       
                 <TableCell align="center"><b>Mobile Number</b></TableCell>
                 <TableCell align="center"><b>City</b></TableCell>
              </TableHead>
              <TableBody>
                {this.state.customer.map(x=>
                    <TableRow>
                    <TableCell align="center">{x.userName}</TableCell>
                    <TableCell align="center">{x.emailId}</TableCell>
                    <TableCell align="center">{x.mobileNo}</TableCell>
                    <TableCell align="center">{x.city}</TableCell>
                    <TableCell align="center" onClick={this.Delete.bind(this,x)} class="td" >Delete</TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper> 
        </div>       
        );
    }
}
     

     
    
